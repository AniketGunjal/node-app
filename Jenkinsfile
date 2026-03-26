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
                sh '''
                if ! command -v npm &> /dev/null
                then
                    echo "Node.js not installed"
                    exit 1
                fi
                npm install
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                eval $(minikube docker-env)
                docker build -t node-app .
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f deployment.yaml'
            }
        }

        stage('Verify') {
            steps {
                sh 'kubectl get pods'
            }
        }
    }

    post {
        failure {
            echo 'Rollback triggered'
            sh 'kubectl rollout undo deployment node-app || true'
        }
    }
}
