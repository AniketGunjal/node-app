
pipeline {
    agent any

    environment {
        APP_NAME = 'node-app'
        IMAGE_TAG = "${BUILD_NUMBER}"
        IMAGE_NAME = "node-app:${BUILD_NUMBER}"
        KUBECONFIG = '/var/lib/jenkins/.kube/config'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'docker run --rm -v "$PWD":/app -w /app node:22-alpine npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'docker run --rm -v "$PWD":/app -w /app node:22-alpine npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t "$IMAGE_NAME" .'
            }
        }

        stage('Load Image into Minikube') {
            steps {
                sh '''
                    docker save "$IMAGE_NAME" -o /tmp/node-app-image.tar
                    docker exec -i minikube ctr -n k8s.io images import - < /tmp/node-app-image.tar
                    docker exec minikube crictl images | grep "$IMAGE_TAG"
                    rm -f /tmp/node-app-image.tar
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                    kubectl set image deployment/node-app \
                      node-app="$IMAGE_NAME"

                    kubectl rollout status deployment/node-app \
                      --timeout=120s
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    kubectl get deployment node-app
                    kubectl get pods -l app=node-app
                    kubectl get service node-app-service
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    kubectl run node-app-health-check \
                      --rm -i \
                      --restart=Never \
                      --image="$IMAGE_NAME" \
                      --image-pull-policy=Never \
                      --command -- node -e "
                        fetch('http://node-app-service:3000/health')
                          .then(async r => {
                            console.log(await r.text());
                            if (!r.ok) process.exit(1);
                          })
                          .catch(() => process.exit(1));
                      "
                '''
            }
        }
    }

    post {
        success {
            echo 'CI/CD pipeline completed successfully!'
        }

        failure {
            echo 'CI/CD pipeline failed. Check the failed stage before taking recovery action.'
        }
    }
}

