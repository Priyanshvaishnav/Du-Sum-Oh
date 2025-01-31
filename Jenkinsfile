pipeline {
    agent any
    environment {
        SCANNER_HOME = tool 'sonar-scanner'
    }
    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }
        
        stage('Git Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Priyanshvaishnav/Du-Sum-Oh.git'
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonar-scanner') {
                    sh '''$SCANNER_HOME/bin/sonar-scanner -Dsonar.projectName=Dumsumoh \
                    -Dsonar.projectKey=Dumsumoh'''
                }
            }
        }
        
        stage('OWASP Dependency Check') {
            steps {
                dependencyCheck additionalArguments: '--scan ./', odcInstallation: 'OWASP DP-Check'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }

        stage('Trivy Scan (File System)') {
            steps {
                script {
                    def exitCode = sh(script: "trivy fs . > trivyfs.txt; echo \$?", returnStatus: true)
                    if (exitCode != 0) {
                        input(message: "Trivy FS scan detected vulnerabilities. Do you want to proceed?", ok: "Proceed")
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t dumsumoh ."
            }
        }

        stage('Trivy Scan (Docker Image)') {
            steps {
                script {
                    def exitCode = sh(script: "trivy image dumsumoh > trivyimage.txt; echo \$?", returnStatus: true)
                    if (exitCode != 0) {
                        input(message: "Trivy Image scan detected vulnerabilities. Do you want to proceed?", ok: "Proceed")
                    }
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker-cred', toolName: 'docker') {   
                        sh "docker tag dumsumoh priyansh21/dumsumoh:latest"
                        sh "docker push priyansh21/dumsumoh:latest"
                    }
                }
            }
        }
    }
}
