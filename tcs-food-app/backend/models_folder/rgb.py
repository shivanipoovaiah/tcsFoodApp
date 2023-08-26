# Reference: https://medium.com/analytics-vidhya/how-to-calculate-rgb-values-for-some-images-in-python-ccf9abcea8f3

from PIL import Image
import numpy as np
import os

def getRGB(image):
    path = "./media"
    arr = np.array(Image.open(os.path.join(path, image)))
    [file_name, ext] = os.path.splitext(image)
    # creating arrays for all the images
    arr = np.array(Image.open(os.path.join(path, image)))
    # calculating height and width for each image
    [h, w] = np.shape(arr)[0:2]
    arr_dim = arr.ndim  # calculating the dimension for each array
    arr_shape = arr.shape  # calculating the shape for each array
    if arr_dim == 2:
        arr_mean = np.mean(arr)
        result = f'[{file_name}, greyscale={arr_mean:.1f}]'
        print(result)
        return result
    else:
        arr_mean = np.mean(arr, axis=(0, 1))
        if len(arr_mean) == 3:  # RGB CASE
            result = f'[{file_name}, R={arr_mean[0]:.1f},  G={arr_mean[1]:.1f}, B={arr_mean[2]:.1f} ]'
            print(result)
            return result
        else:  # ALPHA CASE
            result = f'[{file_name}, R={arr_mean[0]:.1f}, G={arr_mean[1]:.1f}, B={arr_mean[2]:.1f}, ALPHA={arr_mean[3]:.1f}]'
            print(result)
            return result