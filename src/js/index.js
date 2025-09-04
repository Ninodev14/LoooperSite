console.log("cf")
import EmblaCarousel from 'embla-carousel'
import { addPrevNextBtnsClickHandlers } from './EmblaCarouselArrowButtons'
import { addDotBtnsAndClickHandlers } from './EmblaCarouselDotButton'
import Autoplay from 'embla-carousel-autoplay'
import '../css/carousel/base.css'
import '../css/carousel/sandbox.css'
import '../css/carousel/embla.css'

const OPTIONS = { align: 'start', loop: true }

const emblaNode = document.querySelector('.embla')
const viewportNode = emblaNode.querySelector('.embla__viewport')
const prevBtnNode = emblaNode.querySelector('.embla__button--prev')
const nextBtnNode = emblaNode.querySelector('.embla__button--next')
const dotsNode = emblaNode.querySelector('.embla__dots')

const emblaApi = EmblaCarousel(viewportNode, OPTIONS, [Autoplay()])

const onNavButtonClick = (emblaApi) => {
  const autoplay = emblaApi?.plugins()?.autoplay
  if (!autoplay) return

  const resetOrStop =
    autoplay.options.stopOnInteraction === false
      ? autoplay.reset
      : autoplay.stop

  resetOrStop()
}

const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
  emblaApi,
  prevBtnNode,
  nextBtnNode,
  onNavButtonClick
)
const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(
  emblaApi,
  dotsNode,
  onNavButtonClick
)

emblaApi.on('destroy', removePrevNextBtnsClickHandlers)
emblaApi.on('destroy', removeDotBtnsAndClickHandlers)
