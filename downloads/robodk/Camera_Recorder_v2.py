#!/usr/local/bin/python3

import cv2 #if is not installed in your system run in terminal " pip install opencv-python "
import os
import datetime
import tempfile
import shutil
import robodk   # import the robodk library (robotics toolbox)
from robolink import *    # API to communicate with RoboDK

RDK = Robolink()

RDK.Cam2D_Close() #close any Camera on Robodk
tempfile.TemporaryDirectory()
simulation_speed = RDK.SimulationSpeed()

#Video Configuration (Slow(480p)=640x480@30FPS - Medium(720p)=1280x720@60FPS - High(1080p)=1920x1080@60FPS )  
width = 1920
height = 1080
frames_per_second = 60 #in frames per second FPS

# Retrieve the camera reference frame
RDK.setSelection([])
camref = RDK.ItemUserPick('Select a reference frame for the Camera Record', ITEM_TYPE_FRAME)
if not camref.Valid():
    RDK.ShowMessage('No valid Reference frame')
    quit(0)    

#Time to Record Question

def time_question(title_msg, show_value, expected_values):
    if type(show_value) == Mat:
        show_value = show_value.tolist()
    answer = mbox(title_msg, entry=str(show_value))
    if answer is False:
        print('Operation cancelled by user')
        RDK.Cam2D_Close()
        quit(0)
    try:
        answer = int(answer) 
    except:
        print('Bad time number')
        RDK.Cam2D_Close()
        RDK.ShowMessage("Not a valid time number")
        quit(0)
    else:        
        time = answer
        return time
    
time_record = time_question("Enter the time to record in seconds", 10 , 20)
cam_id = RDK.Cam2D_Add(camref, 'FOCAL_LENGHT=5 FOV=30 FAR_LENGHT=10000 SIZE=' + str(width) + "x" + str(height))
pause(1)
# Auxiliary items & operations
date_str = datetime.datetime.now().strftime("%Y-%m-%d-%H-%M-%S")
dir_path = tempfile.gettempdir() + '\Record_' + date_str 
out_path = RDK.getParam('PATH_DESKTOP')
frame_rate = 1 / int(frames_per_second)
n_photos = frames_per_second * int(time_record) 
counter = 0
images = []

# Creating the working folder
if not os.path.exists(dir_path):
    os.makedirs(dir_path)
           
# Image Capture Loop
while counter < n_photos:
    counter = counter +1
    RDK.setSimulationSpeed(0.001)
    file_name = dir_path + "/Image_" + str(counter) + ".png"
    images.append(file_name)
    RDK.Cam2D_Snapshot(file_name)
    print("Saving camera snapshot to the file:" + file_name) 
    RDK.setSimulationSpeed(1)
    pause(frame_rate)

# Define the codec and create VideoWriter object 
fourcc = cv2.VideoWriter_fourcc(*'XVID') # Choose the codec (mp4v, XVID or DIVX)
output = out_path + "/" + date_str + ".avi" # ".mp4" for mp4v.... ".avi" for XVID and DIVX
out = cv2.VideoWriter(output, fourcc, frames_per_second, (width, height))

# Compose the video with the images and the parameters 
for image in images:
    image_path = os.path.join(dir_path, image)
    frame = cv2.imread(image_path)
    out.write(frame) # Write out frame to video
    cv2.imshow('video',frame)

# Release everything if job is finished
out.release()
cv2.destroyAllWindows()

msg_str = "The output video is in " + out_path + format(output)
print(msg_str)
RDK.Cam2D_Close()
RDK.ShowMessage(msg_str)

#Delete de trash (folder&files)
shutil.rmtree(dir_path, ignore_errors=True)
