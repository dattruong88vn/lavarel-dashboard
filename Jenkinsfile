node{
    properties([disableConcurrentBuilds()])
    stage('Checkout Code') {
        checkout([$class: 'GitSCM', branches: [[name: 'origin/$GIT_BRANCH']], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: '']], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'dbe9e94b-6a25-40c8-87d7-9944bffd3932', url: 'git@sc.propzy.vn:root/dashboard.git']]])
    } 
    stage('Build Code') { 
        sh 'npm install'
        sh 'npm run build'
        stage('Get Access Login'){
            sh "${AWSLogin} ecr get-login-password --region ap-southeast-1 | sudo docker login --username AWS --password-stdin $AWSRepo"
        }
        stage('Build image file') {
            sh "docker build -f ./docker/Dockerfile -t dashboard_app:$TAG ."
            sh "docker build -f ./docker/NginxDockerfile -t dashboard_web:$TAG ."
        }
        stage('Tag image file') {
            sh "docker tag dashboard_app:$TAG $AWSRepo/dashboard_app:$TAG"
            sh "docker tag dashboard_web:$TAG $AWSRepo/dashboard_web:$TAG"
        }
        stage('Push image file') {
            sh "docker push $AWSRepo/dashboard_app:$TAG"
            sh "docker push $AWSRepo/dashboard_web:$TAG"
        }
    }
    stage('Deploy'){
        dir("docker"){
            script {
                    sshPublisher(
                        publishers: [
                        sshPublisherDesc(
                            configName: "$SERVER_NODE", 
                            transfers: [                            
                            sshTransfer(
                                excludes: '',                   
                                execTimeout: 120000, 
                                flatten: false, 
                                makeEmptyDirs: false, 
                                noDefaultExcludes: false, 
                                patternSeparator: '[, ]+',                   
                                remoteDirectorySDF: false,                   
                                sourceFiles: '**',
                                removePrefix: '',
                                remoteDirectory: "dashboard_web",
                                execCommand: 'sh ${PWD}/services/dashboard_web/Deploy.sh $AWSRepo $TAG $PORT')
                            ], 
                            usePromotionTimestamp: false, 
                            useWorkspaceInPromotion: false, 
                            verbose: true)
                        ]
                        )
                }
        }
    }
}

