import random
import array
from deap import base
from deap import benchmarks
from deap import creator
from deap import tools
import numpy
# Problem dimension, 最大化紙箱 volume
NDIM = 2
# minimization problem
# create(name, base, attributes)
'''
The weights are used in the fitness comparison. They are shared among all fitnesses of the same type. 
When subclassing Fitness, the weights must be defined as a tuple where each element is associated
 to an objective. A negative weight element corresponds to the minimization of the associated 
 objective and positive weight to the maximization.
'''
# weights 為 1.0 表示最大化 fitness
creator.create("FitnessMax", base.Fitness, weights=(1.0,))
'''
Evolution strategies individuals are slightly different as they contain generally two list, 
one for the actual individual and one for its mutation parameters. This time instead of using 
the list base class we will inherit from an array.array for both the individual and the strategy. 
Since there is no helper function to generate two different vectors in a single object we must 
define this function our-self. The initES() function receives two classes and instantiate them 
generating itself the random numbers in the intervals provided for individuals of a given size.
'''
creator.create("Individual", array.array, typecode='d', fitness=creator.FitnessMax)
toolbox = base.Toolbox()
# for sphere
#toolbox.register("attr_float", random.uniform, -3, 3)
'''
toolbox.register("attr_int", random.randint, INT_MIN, INT_MAX)
toolbox.register("attr_flt", random.uniform, FLT_MIN, FLT_MAX)
toolbox.register("individual", tools.initCycle, creator.Individual,
                 (toolbox.attr_int, toolbox.attr_flt), n=N_CYCLES)
'''
toolbox.register("attr_float", random.uniform, 0, 5)
toolbox.register("individual", tools.initRepeat, creator.Individual, toolbox.attr_float, NDIM)
toolbox.register("population", tools.initRepeat, list, toolbox.individual)
# selection method
toolbox.register("select", tools.selRandom, k=3)
# fitness function is benchmarks.sphere
# for sphere
#toolbox.register("evaluate", benchmarks.sphere)
'''
SURFACE = 80, 最大化 volume
z =(SURFACE - x*y)/(2.*(x+y));
    volume=x*y*z;
'''
def evalVolume(individual):
    SURFACE = 80.0
    x = individual[0]
    y = individual[1]
    # 確保 x 與 y 都是正值
    if x < 0 or y < 0:
        return -1000,
    z =(SURFACE - x*y)/(2.0*(x+y))
    volume = x*y*z
    return volume,

#toolbox.register("evaluate", benchmarks.ackley)
toolbox.register("evaluate", evalVolume)

def main():
    # Differential evolution parameters
    CR = 0.25
    F = 1 
    MU = 300
    NGEN = 100
     
    pop = toolbox.population(n=MU);
    hof = tools.HallOfFame(1)
    stats = tools.Statistics(lambda ind: ind.fitness.values)
    stats.register("avg", numpy.mean)
    stats.register("std", numpy.std)
    stats.register("min", numpy.min)
    stats.register("max", numpy.max)
     
    logbook = tools.Logbook()
    logbook.header = "gen", "evals", "std", "min", "avg", "max"
    
    # Evaluate the individuals
    fitnesses = toolbox.map(toolbox.evaluate, pop)
    for ind, fit in zip(pop, fitnesses):
        ind.fitness.values = fit
    
    record = stats.compile(pop)
    logbook.record(gen=0, evals=len(pop), **record)
    print(logbook.stream)
     
    for g in range(1, NGEN):
        for k, agent in enumerate(pop):
            a,b,c = toolbox.select(pop)
            y = toolbox.clone(agent)
            index = random.randrange(NDIM)
            for i, value in enumerate(agent):
                if i == index or random.random() < CR:
                    y[i] = a[i] + F*(b[i]-c[i])
            y.fitness.values = toolbox.evaluate(y)
            if y.fitness > agent.fitness:
                pop[k] = y
        hof.update(pop)
        record = stats.compile(pop)
        logbook.record(gen=g, evals=len(pop), **record)
        print(logbook.stream)
    print ("Best individual is ", hof[0], hof[0].fitness.values[0])
     
if __name__ == "__main__":
    main()