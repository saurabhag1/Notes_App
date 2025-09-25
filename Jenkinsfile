pipeline {
  agent any
  environment {
    IMAGE = "saurabhag1/notes_app"   // change if using different Docker repo
    TAG = "${env.BUILD_ID}"
  }
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Docker Build & Push') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            docker build -t ${IMAGE}:${TAG} .
            echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
            docker push ${IMAGE}:${TAG}
            docker tag ${IMAGE}:${TAG} ${IMAGE}:latest
            docker push ${IMAGE}:latest
          '''
        }
      }
    }
    stage('Deploy') {
      steps {
        sh '''
          docker pull ${IMAGE}:latest || true
          docker rm -f notes_app || true
          docker run -d --name notes_app -p 80:80 --restart unless-stopped ${IMAGE}:latest
        '''
      }
    }
  }
  post {
    always {
      sh 'docker system prune -f || true'
    }
  }
}
