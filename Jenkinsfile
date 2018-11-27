pipeline {
  agent {
    node {
      label 'agent any'
    }

  }
  stages {
    stage('test') {
      steps {
        sh 'npm install'
        sh 'node server'
      }
    }
  }
}