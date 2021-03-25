const path = require('path')
const fs = require("fs")

const all = [
    {
        path: "Basic-Video-Call",
        folders: [
            "One-To-One-Video#Agora-Web-Tutorial-1to1-Webpack"
        ]
    },
    {
        path: "Advanced-Audio",
        folders: [
            "Custom-Audio-Device#AgoraAudioIO-Web-Webpack"
        ]
    },
    {
        path: "Advanced-Video",
        folders: [
            "Custom-Media-Device#Agora-Custom-VideoSource-Web-Webpack",
            "Large-Group-Video-Chat#LargeGroupVideoChat-Web-Webpack",
            "Screensharing#Agora-Screen-Sharing-Web-Webpack"
        ]
    },
    {
        path: "Advanced-Interactive-Broadcasting",
        folders: [
            "Live-Streaming-Audio-Only#Agora-Interactive-Broadcasting-Live-Streaming-Audio-Only-Web-Webpack",
            // "Live-Streaming-Injection#Agora-Interactive-Broadcasting-Live-Streaming-Injection-Web-Webpack",
            "Live-Streaming#Agora-Interactive-Broadcasting-Live-Streaming-Web-Webpack"
        ]
    },
]

const exec = require('child_process').exec

const prefix = "../"

const removeFile = () => {

const projects = [
    {
       path: "../Basic-Video-Call/One-to-One-Video/Agora-Web-Tutorial-1to1-Webpack/Agora-Web-Tutorial-1to1-Web/",
       name: 'Agora-Web-Tutorial-1to1',
    },
    {
       path: "../Advanced-Interactive-Broadcasting/Live-Streaming/Agora-Interactive-Broadcasting-Live-Streaming-Web-Webpack/Agora-Interactive-Broadcasting-Live-Streaming-Web/",
       name: 'Agora-Interactive-Broadcasting-Live-Streaming-Web',
    },
    // {
    //    path:"../Advanced-Interactive-Broadcasting/Live-Streaming-Injection/Agora-Interactive-Broadcasting-Live-Streaming-Injection-Web-Webpack/Agora-Interactive-Broadcasting-Live-Streaming-Injection-Web/",
    //    name: 'Agora-Interactive-Broadcasting-Live-Streaming-Injection-Web',
    // },
    {
     path: '../Advanced-Video/Screensharing/Agora-Screen-Sharing-Web-Webpack/Agora-Screen-Sharing-Web/',
     name: 'Agora-Screen-Sharing-Web-Webpack',
    },
    {
     path: '../Advanced-Audio/Custom-Audio-Device/AgoraAudioIO-Web-Webpack/AgoraAudioIO-Web/',
     name: 'AgoraAudioIO-Web-Webpack',
    },
    {
      path: '../Advanced-Video/Custom-Media-Device/Agora-Custom-VideoSource-Web-Webpack/Agora-Custom-VideoSource-Web',
      name: 'Agora-Custom-VideoSource-Web'
    },
    {
        path: '../Advanced-Video/Large-Group-Video-Chat/LargeGroupVideoChat-Web-Webpack/LargeGroupVideoChat-Web',
        name: 'LargeGroupVideoChat-Web'
    },
    {
        path: '../RTM/Agora-RTM-Tutorial-Web/Agora-RTM-Tutorial-Web',
        name: 'Agora-RTM-Tutorial-Web'
    }
];
    for (let project of projects) {
        let _proj_path = require('path').resolve(__dirname, project.path)
        console.log("rm'", _proj_path, fs.existsSync(_proj_path))
        if (fs.existsSync(project)) {
            var rimraf = require("rimraf");
            rimraf.sync(_proj_path);
            console.log("del", _proj_path)
        }
    }
}
const buildPaths = []

async function runBuild() {
    for (let dir of all) {
        if (dir.path) {
            let _path = path.resolve(__dirname, prefix + dir.path)
            // console.log('current directory', _path)
            if (!fs.lstatSync(_path).isDirectory()) throw `${_path} is not directory`;
            for (let folderPath of dir.folders) {
                let _folderPath = path.resolve(__dirname, _path + "/" + folderPath.replace('#', '/'))
                if (!fs.lstatSync(_path).isDirectory()) throw `${_folderPath} is not directory`;
                let projectName = folderPath.split("#")[1].replace(/Webpack|Web-Webpack/, 'Web')
                buildPaths.push(_folderPath + "/"+ projectName);
                let {stdout, stderr} = await exec(`cd ${_folderPath}; rm -rf ${projectName}; rm -rf build; npm run build; mv build ${projectName}; echo build ${projectName} done`)
                stdout.on('data', (code) => {
                    console.log('data', code);
                })
                stderr.on('data', (code) => {
                    console.log('err', code)
                })
            }
        }
    }
    return 
}

console.log("run remove file====================")

removeFile();


runBuild().then(() => {

    console.log("done")
}).catch((err) => {
    console.log("ERROR OCCUR! ", err)
})