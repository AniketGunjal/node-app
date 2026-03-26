pipeline {
    agent any

    environment {
        APP_NAME = "node-app"
    }

    stages {

        stage('Clone Code') {
            steps {
                git 'https://github.com/AniketGunjal/node-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat '''
                docker build -t node-app .
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat 'kubectl apply -f deployment.yaml'
            }
        }

        stage('Verify') {
            steps {
                bat 'kubectl get pods'
            }
        }
    }

    post {
        failure {
            echo 'Rollback triggered'
            bat 'kubectl rollout undo deployment node-app'
        }
    }
}
