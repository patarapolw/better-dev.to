import humanizeDuration from 'humanize-duration'

const humanizer = humanizeDuration.humanizer({
  language: 'shortEn',
  languages: {
    shortEn: {
      h: () => 'h',
      m: () => 'm',
      s: () => 's'
    }
  }
})

let commentsNode: HTMLDivElement | null = null

const observer = new MutationObserver(() => {
  if (commentsNode) {
    const now = +new Date()
    observer.disconnect()

    const obs2 = new MutationObserver(() => {
      Array.from(commentsNode!.getElementsByTagName('time')).map((n) => {
        const datetime = n.getAttribute('datetime')
        let human = n.getAttribute('data-human')
        if (!human && datetime) {
          const duration = now - +new Date(datetime)
          if (duration < 1000 * 60 * 60 * 24) {
            human = humanizer(duration, {
              round: true,
              largest: 2,
              spacer: ''
            }).replace(/,/g, '')

            n.innerText = `${human} ago, on ${n.innerText}`
            n.setAttribute('data-human', human)
          }
        }
      })
    })
    obs2.observe(commentsNode, {
      childList: true,
      attributes: true,
      subtree: true,
      attributeFilter: ['datetime']
    })
  }

  commentsNode = document.getElementById('comments') as HTMLDivElement
})

const globalConvertDuration = () => {
  commentsNode = null

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
}

globalConvertDuration()

window.addEventListener('popstate', () => {
  console.log('popstate')
  globalConvertDuration()
})