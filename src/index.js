import { humanizeDuration } from './duration.js'

let commentsNode = null

const observer = new MutationObserver(() => {
  if (commentsNode) {
    const now = +new Date()
    observer.disconnect()

    const obs2 = new MutationObserver(() => {
      Array.from(commentsNode.getElementsByTagName('time')).map((n) => {
        const datetime = n.getAttribute('datetime')
        let human = n.getAttribute('data-human')
        if (!human && datetime) {
          const duration = now - +new Date(datetime)
          human = humanizeDuration(duration, {
            round: true,
            largest: 2,
            spacer: ''
          }).replace(/,/g, '')

          if (duration < 1000 * 60 * 60 * 24) {
            n.innerText = `${human} ago, on ${n.innerText}`
          } else {
            n.innerText = `${n.innerText} (${human} ago)`
          }

          n.setAttribute('data-human', human)
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

  commentsNode = document.getElementById('comments')
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
  globalConvertDuration()
})

window.addEventListener('hashchange', () => {
  globalConvertDuration()
})
