# Sudoku Puzzle App

This is a simple Sudoku puzzle app built using Node.js and Express. The backend generates Sudoku puzzles, and the frontend displays the puzzle in a grid format. The user can interact with the puzzle by filling in the cells.

---
## Installation

### 1. Clone the Repository

To get started, clone this repository to your local machine:

```bash
git clone https://github.com/Priyanshvaishnav/Du-Sum-Oh.git
cd Du-Sum-Oh
```

### 2. Installing
```bash
npm init -y
npm install express
```


### 3. Running the application
```bash
node server.js
```


### 4. Building Docker Image 
For this first you have to login to Docker Desktop
```bash
docker build -t <username_of_docker-desktop>/k8s-node-app:v1 .

```

### 5. Running Container
```bash
docker run -p 3000:3000 <username>/k8s-node-app:v1
```
### 6: Pushing 
```bash
docker push <username>/k8s-node-app:v1

```
### 7: Deploy the Application on Kubernetes
Now that the Docker image is built and pushed, you can follow the earlier steps to deploy your application on Kubernetes.
Apply the Kubernetes configuration:
```bash
kubectl apply -f deployment.yaml
```
Check the status of your pods:
```bash
kubectl get pods
```
