How to contribute to our project
================================

## Getting Started
- Create a Github account if you haven't already
- Install a C++11 compiler, we recommend using GNU GCC/G++
- Submit a short and precise description about your issue but please check for similar issues beforehand [our issue list](https://github.com/DIT168Group9/DIT168Group9/issues).

## Making Changes
* Create a branch with a name appropriate to your issue.
* Make sure you do not commit any dependencies, binaries or otherwise unecessary files to your branch.
* Commit messages should be clear and concise, do not use messages such as "Made changes to file" or "Small fix"
* To get started as fast as possible, we suggest that you use our Docker Image
  * Make sure you have Docker installed and then pull our image from Docker Hub Repository
  * Do not use the :latest tag, and instead find the most recent tag and pull that image
  ```
  docker pull dit168group9/dit168group9:INSERT_TAG_HERE
  ```
  * For now, we only include basic tools such as Vim, G++, CMake, make and ca-certificates, but that will probably change in the future

## Coding Standards
* We use the Stroustrup indentation style, please stick to our coding style throughout your code
* Please only comment lines of code that aren't self explanatory with a short line comment
* Comment all functions with block comments beforehand, explaining the return types, the nature of the arguments as well as the general purpose of the function when it is called
