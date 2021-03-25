const host = 'https://webdemo.agora.io/agora-web-showcase/examples'

let prevOffsetY = 0;

export const scrollTo = (id: string) => {
  const linkElement: HTMLElement = document.querySelector(id) as HTMLElement;
  const element: HTMLElement = linkElement.parentElement as HTMLElement;
  let offsetY: number = element.offsetTop - (linkElement.clientHeight + linkElement.clientHeight + 20);
  const body: HTMLElement = document.querySelector("body") as HTMLElement;
  let height = `${body.clientHeight + offsetY}px`;
  // if (window.pageYOffset > offsetY) {
  //   height = `${window.innerHeight + offsetY}px`;
  // }
  if (window.pageYOffset > offsetY) {
    height = `${window.innerHeight + offsetY}px`;
  }
  if (prevOffsetY !== offsetY) {
    body.style.height = height;
  }
  window.scroll({
    top: offsetY,
    behavior: 'smooth'
  })

  prevOffsetY = offsetY;
}

export const menus = [
  {
    link: "#basic",
    id: "basic",
    name: "Basic",
    items: [
      {
        link: `${host}/Agora-Web-Tutorial-1to1-Web`,
        name: 'One-to-One Video',
        logo: 'icon-net_port_connect',
        desc: 'Quickly create a basic video call using the Agora Web SDK.',
      },
      {
        link: `${host}/Agora-RTM-Tutorial-Web`,
        name: 'Rtm Tutorial',
        logo: 'icon-i-message',
        desc: 'Agora RTM Tutorial using the Agora Web RTM SDK.',
      },
      {
        link: `${host}/Agora-Web-RTS-Tutorial-1to1`,
        name: 'RTS Tutorial',
        logo: 'icon-ziyuanguanli-',
        desc: 'Agora RTS Tutorial using the Agora Web RTS SDK.',
      },
      // {
      //   link: `${host}/basic-voice.html`,
      //   name: 'One To One Voice',
      //   logo: 'icon-clientservice',
      //   desc: 'This tutorial shows you how to quickly create an basic voice communication using the Agora sample app.',
      // },
    ]
  },
  {
    link: "#advanced",
    id: "advanced",
    name: "Advanced",
    items: [
      {
        link: `${host}/Agora-Interactive-Broadcasting-Live-Streaming-Web`,
        name: 'CDN Streaming',
        logo: 'icon-CDNHub',
        desc: 'Publish audio and video streams to the CDN',
      },
      {
        link: `${host}/Agora-Screen-Sharing-Web`,
        name: 'Screen Sharing',
        logo: 'icon-ic_screen_share_px',
        desc: 'Share a screen, window, or tab on a web browser.'
      },
      {
        link: `${host}/AgoraAudioIO-Web`,
        name: 'Audio Mixing',
        logo: 'icon-Mixer-',
        desc: 'Play a custom music file or audio effects in the channel.'
      },
      {
        link: `${host}/Agora-Custom-VideoSource-Web`,
        name: 'Capture Source',
        logo: 'icon-iBotforCapture-',
        desc: 'Use a custom video source'
      },
      {
        link: `${host}/LargeGroupVideoChat-Web`,
        name: 'Large Group Chat',
        logo: 'icon-group',
        desc: 'Share the video chat with a large audience.'
      },
      {
        link: `${host}/17-Multistream`,
        name: '17 MultiStream',
        logo: 'icon-Group',
        desc: '17 MultiStream Live Group'
      },
    ] 
  },
  {
      link: "#scenario",
      id: "scenario",
      name: "Scenario",
      items: [
        {
          link: `https://webdemo.agora.io/agora-web-showcase/examples/OpenLive-Web`,
          name: 'Open Live',
          logo: 'icon-Meeting',
          desc: 'Basic interactive broadcasting - Agora.io OpenLive'
        },
        {
          link: `https://webdemo.agora.io/education_web`,
          name: 'Agora Edu Demo',
          logo: 'icon-Education',
          desc: 'Edu Scenario on Agora WebRTC - Agora.io Edu Demo'
        }
      ]
  },
  {
    link: "#support",
    id: "support",
    name: "Support",
    items: [
      {
        link: `https://webdemo.agora.io/agora_webrtc_troubleshooting`,
        name: 'Troubleshooting',
        logo: 'icon-icon_troubleshooting',
        desc: 'Locate and analyze issues.'
      }
    ] 
  }
]

export const categories = menus.map(({id, link}: any) => ({
  name: id,
  link
}))
