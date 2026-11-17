import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import './App.css'

// Import all images
import heroImg from '/hero.jpg'
import ictDefinitionImg from '/ict-definition.webp'
import ictDailyLifeImg from '/ict-daily-life.avif'
import sectorsOverviewImg from '/sectors-overview.jpg'
import sectorsWorkBankImg from '/modern office banking digital finance split screen professional.jpg'
import sectorsAgriLogisticsImg from '/farm logistics technology drone warehouse truck split screen.webp'
import sectorsHealthHomeImg from '/telemedicine smart home healthcare technology doctor video call.webp'
import sectorsRetailBeautyImg from '/ecommerce beauty fashion virtual try-on shopping mall collage.webp'
import smartphonePartsImg from '/smartphone anatomy labeled diagram microphone earpiece volume power screen buttons.jpg'
import gesturesImg from '/mobile touch gestures tap swipe pinch drag illustration set 6 icons.webp'
import ipoCycleImg from '/input process output cycle diagram computer storage loop CU ALU MU.jpg'
import ioDevicesImg from '/computer peripherals keyboard mouse monitor printer scanner webcam icons grid.jpg'
import memoryStorageImg from '/RAM ROM HDD SSD USB cloud storage hierarchy pyramid vector.png'
import motherboardPortsImg from '/motherboard ports labeled USB-C HDMI Ethernet audio 3.5mm power diagram.jpg'
import filesFoldersImg from '/file folder organization chocolate box analogy Windows finder illustration.webp'
import internetEmailImg from '/web browser search email internet connection diagram Chrome URL bar Venn.jpg'

// Tools grid - generated from icons since no image
import iconsSvg from '/icons.svg'

// Define base slide data - 19 slides matching IMAGE_SEARCH_LIST.md exactly (13 unique images)
const baseSlides = [
  {
    id: 1,
    title: 'ICT Skills',
    subtitle: 'Chapter 3 — Information & Communication Technology',
    type: 'title',
    image: heroImg,
    notes: 'Welcome to Chapter 3. Today we\'ll explore how ICT shapes our world.'
  },
  {
    id: 2,
    title: 'What is ICT?',
    subtitle: 'Information + Communication + Technology',
    type: 'content',
    image: ictDefinitionImg,
    bullets: [
      'ICT = Using technology (computers, phones, internet) to access & share information',
      'Tools that help create, share, store, and manage information',
      'Everywhere: classrooms, hospitals, homes, government offices'
    ],
    notes: 'ICT helps us connect, learn, work, shop, and live smarter.'
  },
  {
    id: 3,
    title: 'ICT in Daily Life',
    subtitle: 'You\'re already using it every day',
    type: 'content',
    image: ictDailyLifeImg,
    bullets: [
      '💬 WhatsApp — Instant messaging',
      '📺 YouTube — Video streaming',
      '💳 PhonePe — Digital payments',
      '📚 Kindle — E-reading',
      '🗺️ Maps — GPS navigation',
      '📧 Gmail — Email'
    ],
    notes: 'Ask the class: Which of these did you use today? Over 5 billion people use the internet!'
  },
  {
    id: 4,
    title: 'ICT Across 9 Sectors',
    subtitle: 'From farms to hospitals, ICT is everywhere',
    type: 'grid',
    image: sectorsOverviewImg,
    sectors: [
      { name: 'Workplace', icon: '💼' },
      { name: 'Agriculture', icon: '🚜' },
      { name: 'Healthcare', icon: '🏥' },
      { name: 'Home', icon: '🏠' },
      { name: 'Retail', icon: '🛒' },
      { name: 'Banking', icon: '🏦' },
      { name: 'Logistics', icon: '🚚' },
      { name: 'Beauty', icon: '💄' },
      { name: 'Apparel', icon: '👗' }
    ],
    notes: 'Each sector uses ICT differently but core tools are the same.'
  },
  {
    id: 5,
    title: 'Workplace & Banking',
    subtitle: 'Digital offices & secure finance',
    type: 'content',
    image: sectorsWorkBankImg,
    bullets: [
      'Workplace: Document creation, data management, online communication',
      'Banking: Digital banking, mobile payments, online transactions, security',
      'Both: Cloud computing, encryption, real-time sync'
    ],
    notes: 'College uses: LMS, online fees, digital library.'
  },
  {
    id: 6,
    title: 'Agriculture & Logistics',
    subtitle: 'Smart farming & tracked delivery',
    type: 'content',
    image: sectorsAgriLogisticsImg,
    bullets: [
      'Agriculture: Weather forecasts, crop management, automation, research',
      'Logistics: Shipment tracking, route optimization, real-time updates',
      'Both: IoT sensors, mobile networks, data analytics'
    ],
    notes: 'Farmer checks mandi prices on phone; delivery tracked in real-time.'
  },
  {
    id: 7,
    title: 'Healthcare & Home',
    subtitle: 'Telemedicine & smart living',
    type: 'content',
    image: sectorsHealthHomeImg,
    bullets: [
      'Healthcare: Telemedicine, electronic records, health/fitness apps',
      'Home: Family connection, streaming, smart device control',
      'Both: Cloud, AI, mobile apps, wireless networks'
    ],
    notes: 'Grandma\'s video call with doctor; lights turn on as you enter.'
  },
  {
    id: 8,
    title: 'Retail, Beauty & Apparel',
    subtitle: 'Virtual shopping experiences',
    type: 'content',
    image: sectorsRetailBeautyImg,
    bullets: [
      'Retail: Online platforms, inventory management, digital payments',
      'Beauty: Virtual try-ons, online consultations, fitness apps',
      'Apparel: Virtual fitting rooms, digital design, social media marketing'
    ],
    notes: 'Try on sunglasses via phone camera; see how jeans fit without trying.'
  },
  {
    id: 9,
    title: 'ICT Tools',
    subtitle: 'The essential toolkit',
    type: 'tools',
    image: null,
    tools: [
      { name: 'Smartphone', desc: 'Calls, messages, internet, apps, GPS, camera' },
      { name: 'Tablet', desc: 'Reading, browsing, drawing, presentations' },
      { name: 'Radio', desc: 'Broadcast news, music, education via sound' },
      { name: 'TV', desc: 'Sound + visuals for learning & entertainment' },
      { name: 'Apps', desc: 'Messaging, banking, studying, specialized tools' }
    ],
    notes: 'Default smartphone apps: Phone, Camera, Calendar, Mail, Photos, Clock, Maps, Messages. Your phone = all 5 tools in one!'
  },
  {
    id: 10,
    title: 'Smartphone Anatomy',
    subtitle: 'A handheld mini-computer',
    type: 'image-focus',
    image: smartphonePartsImg,
    labels: [
      'Microphone — Captures voice during calls',
      'Earpiece — Hear the other person',
      'Volume Buttons — Increase/decrease sound',
      'Power Button — Turn on/off',
      'Touch Screen — Tap/swipe to control',
      'Back / Home / Recent — Navigation buttons'
    ],
    notes: 'Point to each part on your actual phone. Smartphone = mini computer in your pocket.'
  },
  {
    id: 11,
    title: 'Touch Gestures — Live Demo',
    subtitle: 'The language of touchscreens',
    type: 'demo',
    image: gesturesImg,
    gestures: [
      { name: 'Tap', desc: 'Select or open' },
      { name: 'Tap & Hold', desc: 'More options / context menu' },
      { name: 'Drag', desc: 'Move items / scroll slowly' },
      { name: 'Swipe', desc: 'Navigate pages / dismiss' },
      { name: 'Double Tap', desc: 'Zoom in/out' },
      { name: 'Pinch', desc: 'Zoom in/out (two fingers)' }
    ],
    notes: 'DEMO: Project your phone and demonstrate each gesture live.'
  },
  {
    id: 12,
    title: 'Computer = IPO Cycle',
    subtitle: 'Input → Process → Output (with Storage)',
    type: 'image-focus',
    image: ipoCycleImg,
    labels: [
      'Input Devices — Keyboard, mouse, scanner, webcam, mic, barcode',
      'CPU (Brain) — Control Unit | ALU | Memory Unit',
      'Output Devices — Monitor, printer, speakers, projector',
      'Storage — Temporary (RAM) & Permanent (SSD/HDD/USB/Cloud)'
    ],
    notes: 'Everything a computer does follows this cycle. Speed measured in GHz.'
  },
  {
    id: 13,
    title: 'CPU — The Brain',
    subtitle: 'Control Unit • ALU • Memory Unit',
    type: 'content',
    image: ipoCycleImg,
    bullets: [
      'Control Unit (CU) — Directs data flow, tells parts what to do',
      'Arithmetic Logic Unit (ALU) — All math & logic operations',
      'Memory Unit (MU) — Temporary storage during processing',
      'Speed: GHz (billions of cycles/second)'
    ],
    notes: 'Same CPU architecture in phone, laptop, game console. Same IPO image — content changes only.'
  },
  {
    id: 14,
    title: 'Input vs Output Devices',
    subtitle: 'Getting data in & out',
    type: 'image-focus',
    image: ioDevicesImg,
    labels: [
      'INPUT: Keyboard, Mouse, Scanner, Stylus, Webcam, Mic, Barcode Reader',
      'OUTPUT: Monitor, Printer, Speakers, Projector, Plotter',
      'Mouse Actions: Hover, Left-click, Double-click, Right-click, Drag-drop'
    ],
    notes: 'Class activity: Name each icon — is it input or output?'
  },
  {
    id: 15,
    title: 'Memory Hierarchy',
    subtitle: 'Speed vs Capacity vs Cost',
    type: 'image-focus',
    image: memoryStorageImg,
    labels: [
      'Primary: RAM (temp, fast, erased on shutdown) | ROM (perm, BIOS, non-volatile)',
      'Secondary: HDD (500GB–1TB+) | SSD (faster) | USB (4GB–1TB) | SD Card | Optical (CD/DVD)',
      'Cloud — Infinite, network-dependent'
    ],
    notes: 'Analogy: Registers=pocket, RAM=desk, SSD=filing cabinet, Cloud=warehouse.'
  },
  {
    id: 16,
    title: 'Motherboard & Ports',
    subtitle: 'Main circuit board connecting everything',
    type: 'image-focus',
    image: motherboardPortsImg,
    labels: [
      'USB Port (Type-A, Type-C) — Keyboard, mouse, printer, pen drive',
      'Display Port (VGA, HDMI) — Monitor/projector, HDMI = HD video+sound',
      'Audio Ports — Mic input, Line Out (speakers/headphones)',
      'Ethernet Port — Wired high-speed internet (LAN cable)',
      'Power Port — Round or USB-C PD charging'
    ],
    notes: 'Show real cables. USB-C does it all — data, video, power.'
  },
  {
    id: 17,
    title: 'Files & Folders — Digital Organization',
    subtitle: 'Data → File → Folder (Chocolate → Wrapper → Box)',
    type: 'demo',
    image: filesFoldersImg,
    steps: [
      'File = Data + Name + Extension (.txt, .jpg, .mp3, .xls)',
      'Create: Right-click → New → Text Document → Name → Enter',
      'Save: File → Save (Ctrl+S) | Save As = Copy with new name',
      'Folder: Right-click → New → Folder | Subfolder = Folder inside folder'
    ],
    notes: 'LIVE DEMO: Create folder "Class 3" → Subfolder "Section-A" → File "Students_A.txt". No two files with same name in one folder!'
  },
  {
    id: 18,
    title: 'Browser, Internet & Email',
    subtitle: 'Your gateway to the world',
    type: 'demo',
    image: internetEmailImg,
    bullets: [
      'Browser: Chrome/Edge/Firefox — URL bar, tabs, bookmarks, extensions',
      'Internet: Network of networks — Device → Modem → ISP → Internet',
      'Web: Websites on the Internet — URLs, hyperlinks, search engines',
      'Email: Digital mail — name@domain.com, instant, free, global'
    ],
    notes: 'LIVE DEMO: Search "site:gov.in scholarship 2024" → Send test email to yourself.'
  },
  {
    id: 19,
    title: 'Recap — 5 Takeaways',
    subtitle: 'What to remember from Chapter 3',
    type: 'recap',
    image: heroImg,
    takeaways: [
      'ICT = Info + Comm + Tech — powers every sector (9 sectors)',
      'Smartphone = Mini computer (Parts, Features, Gestures, Home screen)',
      'Computer = IPO Cycle (Input→Process→Output) + CPU(CU+ALU+MU) + Memory(RAM/ROM/Storage)',
      'Files/Folders = Digital organization (Chocolate→Wrapper→Box analogy)',
      'Browser + Search + Email = Your daily digital toolkit (Gmail setup, netiquette)'
    ],
    notes: 'Great job! Practice: Create folder, save file, send email. Questions?'
  }
]

// Build presentation steps
function buildSteps(slides) {
  const steps = []
  let lastImage = null

  for (const slide of slides) {
    const sameImageAsLast = slide.image && slide.image === lastImage

    if (!sameImageAsLast && slide.image) {
      steps.push({
        ...slide,
        phase: 'image',
        stepId: steps.length,
        isImageStep: true
      })
      lastImage = slide.image
    } else if (!slide.image) {
      lastImage = null
    }

    steps.push({
      ...slide,
      phase: 'content',
      stepId: steps.length,
      isImageStep: false,
      sameImageAsLast
    })
  }

  return steps
}

const presentationSteps = buildSteps(baseSlides)

// Transition phases
const TRANSITION_PHASES = {
  IDLE: 'idle',
  CONTENT_OUT: 'content-out',
  IMAGE_OUT: 'image-out',
  IMAGE_IN: 'image-in',
  CONTENT_IN: 'content-in'
}

// Transition duration in ms
const TRANSITION_DURATION = 350

function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [progress, setProgress] = useState(0)
  const [bgImageKey, setBgImageKey] = useState(0)
  const [transitionPhase, setTransitionPhase] = useState(TRANSITION_PHASES.IDLE)
  const [nextStepIndex, setNextStepIndex] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const contentRef = useRef(null)
  const transitionTimeoutRef = useRef(null)

  const totalSteps = presentationSteps.length
  const step = presentationSteps[currentStep]
  const isImageStep = step.isImageStep
  const currentImage = step.image

  // Calculate which base slide we're on for progress
  const currentSlideIndex = useMemo(() => {
    let slideIdx = 0
    for (let i = 0; i <= currentStep; i++) {
      if (!presentationSteps[i].isImageStep) {
        slideIdx = presentationSteps[i].id - 1
      }
    }
    return slideIdx
  }, [currentStep])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (isTransitioning) return

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          e.preventDefault()
          handleNextStep()
          break
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault()
          handlePrevStep()
          break
        case 'Home':
          e.preventDefault()
          handleGoToStep(0)
          break
        case 'End':
          e.preventDefault()
          handleGoToStep(totalSteps - 1)
          break
        case 'f':
        case 'F':
          toggleFullscreen()
          break
        case 'c':
        case 'C':
          setShowControls(!showControls)
          break
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isTransitioning, totalSteps, showControls])

  // Progress calculation
  useEffect(() => {
    const slideProgress = ((currentSlideIndex + 1) / baseSlides.length) * 100
    setProgress(slideProgress)
  }, [currentSlideIndex])

  // Track background image changes for cross-fade
  useEffect(() => {
    if (currentImage) {
      setBgImageKey(prev => prev + 1)
    }
  }, [currentImage])

  // Transition sequence handler
  const runTransition = useCallback((targetStep, direction) => {
    if (isTransitioning || targetStep === currentStep) return

    setIsTransitioning(true)
    setNextStepIndex(targetStep)

    // Phase 1: Content flows out (down)
    setTransitionPhase(TRANSITION_PHASES.CONTENT_OUT)

    transitionTimeoutRef.current = setTimeout(() => {
      // Phase 2: Image flows out (scale down + fade)
      setTransitionPhase(TRANSITION_PHASES.IMAGE_OUT)

      transitionTimeoutRef.current = setTimeout(() => {
        // Phase 3: Switch step, image flows in
        setCurrentStep(targetStep)
        setTransitionPhase(TRANSITION_PHASES.IMAGE_IN)

        transitionTimeoutRef.current = setTimeout(() => {
          // Phase 4: Content flows in (up)
          setTransitionPhase(TRANSITION_PHASES.CONTENT_IN)

          transitionTimeoutRef.current = setTimeout(() => {
            // Complete
            setTransitionPhase(TRANSITION_PHASES.IDLE)
            setIsTransitioning(false)
            setNextStepIndex(null)
          }, TRANSITION_DURATION)
        }, TRANSITION_DURATION / 2)
      }, TRANSITION_DURATION)
    }, TRANSITION_DURATION)
  }, [currentStep, isTransitioning])

  const handleNextStep = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      runTransition(currentStep + 1, 'next')
    }
  }, [currentStep, totalSteps, runTransition])

  const handlePrevStep = useCallback(() => {
    if (currentStep > 0) {
      runTransition(currentStep - 1, 'prev')
    }
  }, [currentStep, runTransition])

  const handleGoToStep = useCallback((index) => {
    const clamped = Math.max(0, Math.min(index, totalSteps - 1))
    if (clamped !== currentStep) {
      runTransition(clamped, clamped > currentStep ? 'next' : 'prev')
    }
  }, [currentStep, totalSteps, runTransition])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  // Auto-hide controls after 3s of inactivity
  useEffect(() => {
    let timeout
    const resetTimer = () => {
      setShowControls(true)
      clearTimeout(timeout)
      timeout = setTimeout(() => setShowControls(false), 3000)
    }
    window.addEventListener('mousemove', resetTimer)
    window.addEventListener('keydown', resetTimer)
    resetTimer()
    return () => {
      window.removeEventListener('mousemove', resetTimer)
      window.removeEventListener('keydown', resetTimer)
      clearTimeout(timeout)
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current)
      }
    }
  }, [])

  // Determine which step's content to show during transition
  const displayStep = transitionPhase === TRANSITION_PHASES.IDLE || transitionPhase === TRANSITION_PHASES.CONTENT_OUT
    ? step
    : presentationSteps[nextStepIndex ?? currentStep]

  const displayIsImageStep = displayStep.isImageStep
  const displayImage = displayStep.image

  const renderStepContent = () => {
    if (displayIsImageStep) {
      return (
        <div className="slide-image-only">
          <h1>{displayStep.title}</h1>
          <h2>{displayStep.subtitle}</h2>
          {displayStep.id === 1 && (
            <div className="credit-line">
              Made by Bablade Legend · From Bablade Studios
            </div>
          )}
          <div className="image-hint">Press <kbd>Space</kbd> or <kbd>→</kbd> to continue</div>
        </div>
      )
    }

    switch (displayStep.type) {
      case 'title':
        return (
          <div className="slide-title">
            <h1>{displayStep.title}</h1>
            <h2>{displayStep.subtitle}</h2>
            <div className="credit-line">
              Made by Bablade Legend · From Bablade Studios
            </div>
            <p className="slide-notes">{displayStep.notes}</p>
          </div>
        )
      case 'content':
        return (
          <div className="slide-content">
            <h1>{displayStep.title}</h1>
            <h2>{displayStep.subtitle}</h2>
            <ul>
              {displayStep.bullets?.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
            <p className="slide-notes">{displayStep.notes}</p>
          </div>
        )
      case 'grid':
        return (
          <div className="slide-grid">
            <h1>{displayStep.title}</h1>
            <h2>{displayStep.subtitle}</h2>
            <div className="sectors-grid">
              {displayStep.sectors?.map((sector, i) => (
                <div key={i} className="sector-card">
                  <span className="sector-icon">{sector.icon}</span>
                  <span className="sector-name">{sector.name}</span>
                </div>
              ))}
            </div>
            <p className="slide-notes">{displayStep.notes}</p>
          </div>
        )
      case 'tools':
        return (
          <div className="slide-tools">
            <h1>{displayStep.title}</h1>
            <h2>{displayStep.subtitle}</h2>
            <div className="tools-grid">
              {displayStep.tools?.map((tool, i) => (
                <div key={i} className="tool-card">
                  <h3>{tool.name}</h3>
                  <p>{tool.desc}</p>
                </div>
              ))}
            </div>
            <p className="slide-notes">{displayStep.notes}</p>
          </div>
        )
      case 'image-focus':
        return (
          <div className="slide-image-focus">
            <h1>{displayStep.title}</h1>
            <h2>{displayStep.subtitle}</h2>
            <ul className="labels">
              {displayStep.labels?.map((label, i) => (
                <li key={i}>{label}</li>
              ))}
            </ul>
            <p className="slide-notes">{displayStep.notes}</p>
          </div>
        )
      case 'demo':
        return (
          <div className="slide-demo">
            <h1>{displayStep.title}</h1>
            <h2>{displayStep.subtitle}</h2>
            <div className="demo-badge">🎬 LIVE DEMO</div>
            {displayStep.gestures && (
              <ul className="gestures">
                {displayStep.gestures.map((g, i) => (
                  <li key={i}>
                    <strong>{g.name}</strong> — {g.desc}
                  </li>
                ))}
              </ul>
            )}
            {displayStep.steps && (
              <ol className="steps">
                {displayStep.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            )}
            {displayStep.bullets && (
              <ul>
                {displayStep.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
            <p className="slide-notes">{displayStep.notes}</p>
          </div>
        )
      case 'recap':
        return (
          <div className="slide-recap">
            <h1>{displayStep.title}</h1>
            <h2>{displayStep.subtitle}</h2>
            <ol className="takeaways">
              {displayStep.takeaways?.map((t, i) => (
                <li key={i}>
                  <span className="takeaway-number">{i + 1}</span>
                  {t}
                </li>
              ))}
            </ol>
            <p className="slide-notes">{displayStep.notes}</p>
          </div>
        )
      default:
        return null
    }
  }

  const displaySlideNumber = displayStep.id
  const totalSlides = baseSlides.length

  return (
    <div className="presentation-app">
      {/* Progress bar at top */}
      <div className="progress-bar" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Slide container */}
      <div className="slide-container">
        {/* Background image layer */}
        <div className="bg-layer">
          {displayImage && (
            <div
              key={bgImageKey}
              className={`slide-bg ${displayIsImageStep ? 'image-step' : 'content-step'}`}
              style={{ backgroundImage: `url(${displayImage})` }}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Slide content */}
        <div className="slide-wrapper">
          <div
            key={currentStep}
            className={`slide-content-wrapper ${transitionPhase}`}
            ref={contentRef}
          >
            {renderStepContent()}
          </div>

          {/* Slide number */}
          <div className="slide-number" aria-label={`Slide ${displaySlideNumber} of ${totalSlides}${displayIsImageStep ? ' (image)' : ''}`}>
            {displaySlideNumber} / {totalSlides}
            {displayIsImageStep && <span className="phase-indicator">📷</span>}
          </div>
        </div>
      </div>

      {/* Bottom-left controls - FIXED POSITION, never moves */}
      <div className={`controls ${showControls ? 'visible' : 'hidden'}`} role="navigation" aria-label="Presentation controls">
        <div className="controls-inner">
          <button
            className="control-btn"
            onClick={() => handleGoToStep(0)}
            disabled={currentStep === 0 || isTransitioning}
            aria-label="First slide (Home)"
            title="First Slide (Home)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </button>

          <button
            className="control-btn"
            onClick={handlePrevStep}
            disabled={currentStep === 0 || isTransitioning}
            aria-label="Previous step (Left arrow)"
            title="Previous (←)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="slide-indicator" aria-live="polite">
            <span className="current">{displaySlideNumber}</span>
            <span className="separator">/</span>
            <span className="total">{totalSlides}</span>
            {displayIsImageStep && <span className="phase-badge">IMG</span>}
          </div>

          <button
            className="control-btn"
            onClick={handleNextStep}
            disabled={currentStep === totalSteps - 1 || isTransitioning}
            aria-label="Next step (Right arrow)"
            title="Next (→)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <button
            className="control-btn"
            onClick={() => handleGoToStep(totalSteps - 1)}
            disabled={currentStep === totalSteps - 1 || isTransitioning}
            aria-label="Last slide (End)"
            title="Last Slide (End)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 15l-9 7-9-7V4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <polyline points="9 2 9 12 15 12 15 2" />
            </svg>
          </button>

          <button
            className="control-btn fullscreen-btn"
            onClick={toggleFullscreen}
            disabled={isTransitioning}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
          >
            {isFullscreen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            )}
          </button>

          <div className="keyboard-hint" aria-hidden="true">
            <kbd>←</kbd> <kbd>→</kbd> step • <kbd>Home</kbd> <kbd>End</kbd> jump • <kbd>F</kbd> fullscreen • <kbd>Space</kbd> next
          </div>
        </div>
      </div>
    </div>
  )
}

export default App