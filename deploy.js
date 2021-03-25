const chalk = require("chalk");
const path = require("path");
const Rsync = require("rsync");

// ProductionServers
// const TestServers = [
//  "webdemo_1:/home/devops/web_demo/project",
//  "webdemo_2:/home/devops/web_demo/project",
// ];

// @WebdemoPath
const TestServers = [
  "webdemo_1:/home/devops/web_demo/project/agora-web-showcase/examples",
  "webdemo_2:/home/devops/web_demo/project/agora-web-showcase/examples",
];

// const TestServers = [
//   "webdemo_1:/home/devops/web_demo/project",
//   "webdemo_2:/home/devops/web_demo/project",
// ];

const ProductionServers = []

const demos = [
  {
    path: '/Users/ly/Project/agora-workspace/Advanced-Video/17-Multistream/17-Multistream',
    name: '17-Multistream',
  },
  {
    path: '/Users/ly/Project/agora-workspace/Advanced-Video/Custom-Media-Device/Agora-Custom-VideoSource-Web-Webpack/Agora-Custom-VideoSource-Web',
    name: 'Agora-Custom-VideoSource-Web',
  },
  {
    path: '/Users/ly/Project/tools/TroubleShooting/Agora-WebRTC-Troubleshooting/agora_webrtc_troubleshooting',
    name: 'agora_webrtc_troubleshooting',
  },
  {
    path: '/Users/ly/Project/agora-workspace/Advanced-Video/Large-Group-Video-Chat/LargeGroupVideoChat-Web-Webpack/LargeGroupVideoChat-Web',
    name: 'LargeGroupVideoChat-Web'
  },
  {
    path: '/Users/ly/Advanced-Video/Web/Agora-Screen-Sharing-Web-Webpack/Agora-Screen-Sharing-Web',
    name: 'Agora-Screen-Sharing-Web'
  },
  {
    path: '/Users/ly/Basic-Video-Broadcasting/OpenLive-Web/OpenLive-Web',
    name: 'OpenLive-Web'
  },
  {
    path: '/Users/ly/Project/Basic-Video-Call/One-to-One-Video/Agora-Web-Tutorial-1to1-Webpack/Agora-Web-Tutorial-1to1-Web',
    name: 'Agora-Web-Tutorial-1to1-Web',
  },
  {
    path: '/Users/ly/Project/agora-workspace/Advanced-Interactive-Broadcasting/Live-Streaming/Agora-Interactive-Broadcasting-Live-Streaming-Web-Webpack/Agora-Interactive-Broadcasting-Live-Streaming-Web',
    name: 'Agora-Interactive-Broadcasting-Live-Streaming-Web'
  },
  // {
  //   path: '/Users/ly/Project/agora-workspace/Advanced-Interactive-Broadcasting/Live-Streaming-Injection/Agora-Interactive-Broadcasting-Live-Streaming-Injection-Web-Webpack/Agora-Interactive-Broadcasting-Live-Streaming-Injection-Web',
  //   name: 'Agora-Interactive-Broadcasting-Live-Streaming-Injection-Web',
  // },
  // {
  //   path: '',
  //   name: '',
  // },
  // {
  //   path: '',
  //   name: '',
  // }
]

// const demos = [
  // {
  //   path: '/Users/ly/hot_fix_education/education_web/education_alpha',
  //   name: 'education_alpha',
  // },
  // {
  //   path: '/Users/ly/hot_fix_education/education_web/preview',
  //   name: 'preview',
  // }
  // {
  //   path: '/Users/ly/hot_fix_education/education_web/education/web',
  //   name: 'web',
  // }
  // {
  //   path: '/Users/ly/Project/eEducation-Web/education_web',
  //   name: 'education_web'
  // },
  // {
  //   path: '/Users/ly/Project/eEducation-Web/live_education',
  //   name: 'live_education'
  // }
    //  {
    //    path: '/Users/ly/Project/eEducationApp/education_web/web',
    //    name: 'web'
    //  }
  // {
  //   path: "./agora-web-showcase",
  //   name: 'agora-example-showcase-web',
  // },
  // {
  //   path: "/Users/ly/Project/agora-workspace/RTM/Agora-RTM-Tutorial-Web/Agora-RTM-Tutorial-Web",
  //   name: "Agora-RTM-Tutorial-Web"
  // },
    //{
    // path: "../education_admin/edu_admin",
    // name: "edu_admin"
    //},
  // {
  //  path: "../eEducation/education_web/live",
  //  name: "live"
  // },
    // {
        //path: "../eEducation/education_web/live_education",
        //path: '/Users/ly/Project/eEducation-Web/live_education',
        // path: "/Users/ly/hot_fix_education/education_web/education_web",
        //name: "live_education"
    //  name: "education_web"
    // }
    //    {
    //    path: "/Users/ly/eEducation/education_web/education_web",
    //    //    //  path: "/Users/ly/eEducation/education_web/education_web",
    //    //     //path: "/Users/ly/hot_fix_education/education_web/education_meishubao",
    //    //     // name: "education_meishubao",
    //    name: "education_web"
    //    },
  // {
  //   path: "/Users/ly/eEducation/education_web/education_test",
  //   name: "education_test"
  // },
  // WARN: TEMP
  // {
  //   path: "/Users/ly/eEducation/education_web/web",
  //   name: "web"
  // },
  // {
  //   path: "../eEducation/education_web/web",
  //   name: "web"
  // },
  // {
  //   path: "../../../eEducation/education_web/education_web",
  //   name: "education_web"
  // },
  // {
  //   path: "../../Tools/TroubleShooting/Agora-WebRTC-Troubleshooting/agora_webrtc_troubleshooting",
  //   name: "agora_webrtc_troubleshooting",
  // }
  // {
  //   path: '../Basic-Video-Call/One-to-One-Video/Agora-Web-Tutorial-1to1-Webpack/Agora-Web-Tutorial-1to1-Web',
  //   name: 'Agora-Web-Tutorial-1to1-Web',
  // },
  // {
  //   path: '../Basic-Video-Call/One-to-One-Video/Agora-Web-RTS-Tutorial-1to1-Webpack/Agora-Web-RTS-Tutorial-1to1',
  //   name: "Agora-Web-RTS-Tutorial-1to1"
  // },
  // {
  //   path: '../RTM/Agora-RTM-Tutorial-Web/Agora-RTM-Tutorial-Web',
  //   name: "Agora-RTM-Tutorial-Web"
  // },
  // {
  //   path: '../Advanced-Interactive-Broadcasting/Live-Streaming/Agora-Interactive-Broadcasting-Live-Streaming-Web-Webpack/Agora-Interactive-Broadcasting-Live-Streaming-Web',
  //   name: 'Agora-Interactive-Broadcasting-Live-Streaming-Web',
  // },
  // {
  //   path: '../Advanced-Interactive-Broadcasting/Live-Streaming-Audio-Only/Agora-Interactive-Broadcasting-Live-Streaming-Audio-Only-Web-Webpack/Agora-Interactive-Broadcasting-Live-Streaming-Audio-Only-Web',
  //   name: 'Agora-Interactive-Broadcasting-Live-Streaming-Audio-Only-Web',
  // },
  // {
  //   path: '../Advanced-Interactive-Broadcasting/Live-Streaming-Injection/Agora-Interactive-Broadcasting-Live-Streaming-Injection-Web-Webpack/Agora-Interactive-Broadcasting-Live-Streaming-Injection-Web',
  //   name: 'Agora-Interactive-Broadcasting-Live-Streaming-Injection-Web'
  // },
  // {
  //   path: '/Users/ly/Project/agora-workspace/Advanced-Audio/Web/AgoraAudioIO-Web-Webpack/AgoraAudioIO-Web',
  //   name: 'AgoraAudioIO-Web'
  // },
  // {
  //   path: '/Users/ly/Advanced-Video/Web/LargeGroupVideoChat-Web-Webpack/LargeGroupVideoChat-Web',
  //   name: 'LargeGroupVideoChat-Web',
  // },
  // {
  //   path: '/Users/ly/Advanced-Video/Web/17-Multistream/17-Multistream',
  //   name: '17-Multistream',
  // },
  // {
  //   path: '/Users/ly/Advanced-Video/Web/Agora-Screen-Sharing-Web-Webpack/Agora-Screen-Sharing-Web',
  //   name: 'Agora-Screen-Sharing-Web',
  // },
  // {
  //   path: '../Advanced-Video/17-Multistream/17-Multistream',
  //   name: '17-Multistream'
  // },
  // {
  //   path: '../Advanced-Video/Screensharing/Agora-Screen-Sharing-Web-Webpack/Agora-Screen-Sharing-Web',
  //   name: 'Agora-Screen-Sharing-Web'
  // },
  // {
  //   path: '../Advanced-Video/Large-Group-Video-Chat/LargeGroupVideoChat-Web-Webpack/LargeGroupVideoChat-Web',
  //   name: 'LargeGroupVideoChat-Web'
  // },
  // {
  //   path: '/Users/ly/Project/Tools/TroubleShooting/Agora-WebRTC-Troubleshooting/agora_webrtc_troubleshooting',
  //   name: 'agora_webrtc_troubleshooting'
  // }
  // {
  //   path: '/Users/ly/Advanced-Video/Web/Agora-Custom-VideoSource-Web-Webpack/Agora-Custom-VideoSource-Web',
  //   name: 'Agora-Custom-VideoSource-Web'
  // },
  // {
  //   path: '../Basic-Video-Broadcasting/OpenLive-Web/OpenLive-Web',
  //   name: 'OpenLive-Web'
  // },
  // {
  //   path: '../video-content-analytics/video-analytics',
  //   name: 'video-analytics'
  // },
  // {
  //   path: '../recording-player/recording-player',
  //   name: 'recording-player'
  // }
// ]

const deploy = (serverFullPath, clientFullPath, env="test") => {
  return new Promise((resolve, reject) => {
    const rsync = new Rsync()
      .shell("ssh -o TCPKeepAlive=yes -p 20220")
      .flags("avz")
      .exclude(env === 'production' ? ["*.map"] : [])
      .source(clientFullPath)
      .destination(serverFullPath)
      .progress()
      .quiet()
      .delete();

    rsync.execute(
      function(error, code, cmd) {
        if (error) {
          reject(error)
        }
        resolve();
      },
      function(data) {
        console.log(chalk.greenBright(data.toString()));
      },
      function(err) {
        console.log(chalk.redBright(data.toString()));
      }
    );
  });
};

const run = async () => {
  const env = process.env.NODE_ENV;
  const targetServers = env === 'production' ? ProductionServers : TestServers;
  for (let server of targetServers) {
    for (let demo of demos) {
      const name = demo.name;
      const fullPath = `${server}`;
      await deploy(fullPath, path.resolve(__dirname, demo.path), env).then(() => {
        console.log(chalk.green(`[${server}] has been deployed.`))
      }).catch(err => {
        console.log(chalk.red(`Failed to deploy on [${server}], ${err}`))
      })
    }

  }
  process.exit()
}

run();
