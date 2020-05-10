# https://github.com/flukeskywalker/PyRGA
# 原始程式為 Python2 修改為 Python3 格式
# 除了原先的最大化適應值外, 增加最小化方法設定
import numpy as np
import random
import math

# 請注意各代族群數必須為 4 的倍數
class GA: # popsize must be multiple of 4
    def __init__(self, obj, dim, popsize, ngen, pc, pm, etac, etam, min):
        self.EPSILON = 10e-6
        self.INFINITY = 10e6
        self.pop = []
        self.fits = []
        self.obj = obj
        self.dim = dim
        self.popsize = popsize
        self.ngen = ngen
        self.pc = pc
        self.pm = pm
        self.etac = etac
        self.etam = etam
        # min = 1 表最小化, min = -1 表最大化
        self.min = min
        self.RIGID = 0
        self.lowb = -self.INFINITY*np.ones(self.dim)
        self.highb = self.INFINITY*np.ones(self.dim)
        self.tourneylist = range(0, self.popsize)
        self.tourneysize = 2 # works for 2 for now
        self.bestmemyet = np.zeros(self.dim)
        # 若是求最大值
        if self.min == -1:
            self.bestfityet = -np.inf
        else:
        # 若是求最小值
            self.bestfityet = np.inf
        self.pop_init()

    def pop_init(self):
        self.pop = [np.random.rand(self.dim) for _ in range(self.popsize)]
        for member in self.pop:
            for i in range(self.dim):
                member[i] = self.lowb[i] + member[i]*(self.highb[i]-self.lowb[i])
        self.fits = [self.obj(member) for member in self.pop]
        #self.pop_print()
        return

    def setbounds(self, lows, highs):
        for i in range(self.dim):
            self.lowb[i] = lows[i]
            self.highb[i] = highs[i]
        self.pop_init()
        return

    def run(self):
        for gen in range(self.ngen):
            print("Generation ", gen)
            self.pop = self.getnewpop()
            self.eval_pop()
            #self.pop_print()
        return [self.bestmemyet, self.bestfityet]

    def getnewpop(self):
        newpop = []
        #self.tourneylist = range(0, self.popsize)
        random.shuffle(list(self.tourneylist))
        self.tourneypos = 0
        for i in range(0, self.popsize, 2):
            [p1, p2] = self.getparents() #return parents, not just indices
            [c1, c2] = self.xover(p1, p2) #return children, not just indices
            c1 = self.mutate(c1)
            c2 = self.mutate(c2)
            newpop.append(c1)
            newpop.append(c2)
        return newpop

    def getparents(self):
        if (self.popsize - self.tourneypos) < self.tourneysize:
            random.shuffle(list(self.tourneylist))
            self.tourneypos = 0
        if self.min == -1:
            if (self.fits[self.tourneylist[self.tourneypos]]>self.fits[self.tourneylist[self.tourneypos+1]]):
                p1 = self.pop[self.tourneylist[self.tourneypos]]
            else:
                p1 = self.pop[self.tourneylist[self.tourneypos+1]]
        else:
            if (self.fits[self.tourneylist[self.tourneypos]]<self.fits[self.tourneylist[self.tourneypos+1]]):
                p1 = self.pop[self.tourneylist[self.tourneypos]]
            else:
                p1 = self.pop[self.tourneylist[self.tourneypos+1]]
        self.tourneypos += self.tourneysize

        if self.min == -1:
            if (self.fits[self.tourneylist[self.tourneypos]]>self.fits[self.tourneylist[self.tourneypos+1]]):
                p2 = self.pop[self.tourneylist[self.tourneypos]]
            else:
                p2 = self.pop[self.tourneylist[self.tourneypos+1]]
        else:
            if (self.fits[self.tourneylist[self.tourneypos]]<self.fits[self.tourneylist[self.tourneypos+1]]):
                p2 = self.pop[self.tourneylist[self.tourneypos]]
            else:
                p2 = self.pop[self.tourneylist[self.tourneypos+1]]
        self.tourneypos += self.tourneysize
        return [p1, p2]

    def xover(self, p1, p2): # Here p1 and p2 are pop members
        c1 = np.zeros_like(p1)
        c2 = np.zeros_like(p2)
        if random.random()<=self.pc: # do crossover
            for i in range(p1.size):
                if random.random()<0.5: # 50% variables crossover
                    [c1[i], c2[i]] = self.crossvars(p1[i], p2[i], self.lowb[i], self.highb[i])
                else:
                    [c1[i], c2[i]] = [p1[i], p2[i]]
        else:
            c1 = p1
            c2 = p2
        return [c1, c2]

    def crossvars(self, p1, p2, low, high): # Here p1 and p2 are variables
        if p1>p2:
            p1, p2 = p2, p1 # p1 must be smaller
        mean = (p1+p2)*0.5
        diff = (p2-p1)
        dist = max(min(p1-low, high-p2), 0)
        if (self.RIGID and diff > self.EPSILON):
            alpha = 1.0 + (2.0*dist/diff)
            umax = 1.0 - (0.5/pow(alpha, (self.etac+1.0)))
            seed = umax*random.random()
        else:
            seed = random.random()
        beta = self.getbeta(seed)
        if (abs(diff*beta) > self.INFINITY):
            beta = self.INFINITY/diff
        c2 = mean + beta*0.5*diff
        c1 = mean - beta*0.5*diff
        c1 = max(low, min(c1, high))
        c2 = max(low, min(c2, high))
        return [c1, c2]

    def getbeta(self, seed):
        if (1 - seed) < self.EPSILON:
            seed = 1 - self.EPSILON
        seed = max(0.0, seed)
        if seed < 0.5:
            beta = pow(2.0*seed, (1.0/(self.etac+1.0)))
        else:
            beta = pow((0.5/(1.0-seed)), (1.0/(self.etac+1.0)))
        return beta

    def getdelta(self, seed, delta_low, delta_high):
        if seed >= 1.0 - (self.EPSILON/1e3):
            return delta_high
        if seed <= (self.EPSILON/1e3):
            return delta_low
        if seed <= 0.5:
            dummy = 2.0*seed + (1.0 - 2.0*seed)*pow((1+delta_low), (self.etam+1.0))
            delta = pow(dummy, (1.0/(self.etam+1.0))) - 1.0
        else:
            dummy = 2.0*(1.0 - seed) + 2.0*(seed - 0.5)*pow((1-delta_high), (self.etam+1.0))
            delta = 1.0 - pow(dummy, (1.0/(self.etam+1.0)))
        return delta

    def mutate(self, member):
        mut_member = np.zeros_like(member)
        for i in range(member.size):
            low = self.lowb[i]
            high = self.highb[i]
            if random.random() <= self.pm: # pm is simply the prob of a variable to mutate
                if self.RIGID:
                    value = member[i]
                    delta_low = max((low-value)/(high-low), -1.0)
                    delta_high = min((high-value)/(high-low), 1.0)
                    if abs(delta_low)<abs(delta_high):
                        delta_high = -delta_low
                    else:
                        delta_low = -delta_high
                else:
                    delta_low = -1.0
                    delta_high = 1.0
                seed = random.random()
                delta = self.getdelta(seed, delta_low, delta_high)*(high-low)
                mut_member[i] = max(low, min(member[i] + delta, high))
            else:
                mut_member[i] = member[i]
        return mut_member

    def eval_pop(self):
        self.fits = [self.obj(member) for member in self.pop]
        # 若是最大化適應值題目者
        if self.min == -1:
            # 將所有適應值中最大者, 指向 bestindex
            bestindex = np.argmax(self.fits)
        else:
            # 將所有適應值中最大者, 指向 bestindex
            bestindex = np.argmin(self.fits)
        bestmember = self.pop[bestindex]
        bestfitness = self.fits[bestindex]
        # self.min = -1 for maximization, self.min = 1 for minimization
        if self.min == -1:
            # 若是在族群中的最佳適應值大於目前為止最佳的適應值
            if bestfitness > self.bestfityet:
                # 則將此最大適應值指為目前為止最佳適應值
                self.bestfityet = bestfitness
                # 並且將最佳族群成員指向目前最佳成員
                self.bestmemyet = bestmember
        else:
            if bestfitness < self.bestfityet:
                self.bestfityet = bestfitness
                self.bestmemyet = bestmember
        print("Current best: ", bestfitness, "Best yet: ", self.bestfityet)

    def pop_print(self):
        for i in range(self.popsize):
            print(self.pop[i], self.fits[i])
        return

# 若單獨存在則需導入 GA 所有方法
#import GA
#from GA import *
import numpy as np

def square(x):
    term1 = (x[0]*x[0]+x[1]-11.0)*(x[0]*x[0]+x[1]-11.0)
    term2 = (x[0]+x[1]*x[1]- 7.0)*(x[0]+x[1]*x[1]- 7.0)
    term3 = term1+term2
    return term3

# 最大化體積題目
def volume(x):
    surface = 80.0
    z = (surface-x[0]*x[1])/(2.0*(x[0]+x[1]))
    volume = x[0]*x[1]*z
    return volume


def miniex1(x):
    '''Minimizing Beale's function (optimal value f(3, 0.5) = 0):
    ga=GA(miniex1, dim=2, popsize=400, ngen=500, pc=0.9, pm=0.3, etac=2, etam=100, min=1)
    ga.setbounds(np.zeros(10), 10*np.ones(10))
    '''
    term1 = 1.5 - x[0] + x[0]*x[1]
    term2 = 2.25 - x[0] + x[0]*x[1]*x[1]
    term3 = 2.625 - x[0] + x[0]*x[1]*x[1]*x[1]
    return term1*term1 + term2*term2 + term3*term3

def miniex2(x):
    '''Schaffer function #2. Minimium at (0,0), equal to 0
    ga=GA(miniex2, dim=2, popsize=100, ngen=50, pc=0.9, pm=0.1, etac=2, etam=100, min=1)
    ga.setbounds(np.zeros(10), 10*np.ones(10))
    '''
    return 0.5 + (math.pow(math.sin(x[0]*x[0]-x[1]*x[1]), 2) - 0.5)/math.pow(1+0.001*(x[0]*x[0]+x[1]*x[1]), 2)

#ga=GA(square, dim=2, popsize=40, ngen=50, pc=0.9, pm=0.1, etac=2, etam=100, min=-1)
# min = -1 表示要最大化適應方程式的值, 若 min = 1 表示要最小化
#ga=GA(volume, dim=2, popsize=400, ngen=500, pc=0.9, pm=0.1, etac=2, etam=100, min=-1)
ga=GA(miniex1, dim=2, popsize=100, ngen=50, pc=0.9, pm=0.1, etac=2, etam=100, min=1)
ga.setbounds(np.zeros(10), 10*np.ones(10))
#ga.setbounds(-10*np.ones(10), 10*np.ones(10))
#ga.pop_init()
print(ga.run())