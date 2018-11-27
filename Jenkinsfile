pipeline {
  agent {
    node {
      label 'agent any'
    }

  }
  stages {
    stage('test') {
      steps {
        sh '{"install":"npm install"}'
        sh 'node server'
      }
    }
  }
}