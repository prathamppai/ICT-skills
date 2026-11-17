import { useState, useEffect, useCallback, useMemo } from 'react'
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

// Define base slide data
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
      'ICT = Tools that help us create, share, store & manage information',
      'Combines computing, telecommunications, and media',
      'Powers everything from smartphones to satellite networks'
    ],
    notes: 'ICT isn\'t just computers — it\'s the entire ecosystem of digital communication.'
  },
  {
    id: 3,
    title: 'ICT in Your Daily Life',
    subtitle: 'You\'re already using it every day',
    type: 'content',
    image: ictDailyLifeImg,
    bullets: [
      '💬 WhatsApp — Instant messaging',
      '📺 YouTube — Video streaming',
      '💳 PhonePe — Digital payments',
      '📚 Kindle — E-reading',
      '🗺️ Maps — Navigation',
      '📧 Gmail — Email'
    ],
    notes: 'Ask the class: Which of these did you use today?'
  },
  {
    id: 4,
    title: 'Where ICT Lives — 9 Sectors',
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
    notes: 'Quick tour — each sector uses ICT differently but the core tools are the same.'
  },
  {
    id: 5,
    title: 'Workplace & Banking',
    subtitle: 'Digital offices & secure finance',
    type: 'content',
    image: sectorsWorkBankImg,
    bullets: [
      'Workplace: Cloud docs, video calls, project management',
      'Banking: Mobile apps, UPI, digital wallets, cybersecurity',
      'Both rely on: Cloud computing, encryption, real-time sync'
    ],
    notes: 'Show how your college uses ICT — LMS, online fees, digital library.'
  },
  {
    id: 6,
    title: 'Agriculture & Logistics',
    subtitle: 'Smart farming & tracked delivery',
    type: 'content',
    image: sectorsAgriLogisticsImg,
    bullets: [
      'Agriculture: Weather apps, soil sensors, drone monitoring, market prices',
      'Logistics: GPS tracking, route optimization, warehouse automation',
      'Both use: IoT sensors, mobile networks, data analytics'
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
      'Healthcare: Video consultations, EHR, health apps, wearable trackers',
      'Home: Smart lights, voice assistants, security cams, streaming',
      'Both use: Cloud, AI, mobile apps, wireless networks'
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
      'Retail: E-commerce, inventory systems, digital payments',
      'Beauty: AR virtual try-on, appointment apps, skin analysis',
      'Apparel: Virtual fitting rooms, 3D design, social commerce'
    ],
    notes: 'Try on sunglasses via phone camera; see how jeans fit without trying.'
  },
  {
    id: 9,
    title: 'ICT Tools You Already Use',
    subtitle: 'The essential toolkit',
    type: 'tools',
    image: null, // No background image for tools slide
    tools: [
      { name: 'Smartphone', desc: 'Calls, apps, internet, GPS, camera' },
      { name: 'Tablet', desc: 'Reading, drawing, presentations, media' },
      { name: 'Radio', desc: 'Broadcast audio — news, music, education' },
      { name: 'TV', desc: 'Video broadcast, smart apps, streaming' },
      { name: 'Apps', desc: 'Specialized tools for every task' }
    ],
    notes: 'Hold up your phone — it\'s all five tools in one device.'
  },
  {
    id: 10,
    title: 'Smartphone Anatomy',
    subtitle: 'Every part has a purpose',
    type: 'image-focus',
    image: smartphonePartsImg,
    labels: [
      'Microphone — Voice input',
      'Earpiece — Call audio output',
      'Volume Buttons — Sound control',
      'Power Button — On/Off, sleep/wake',
      'Touch Screen — Primary input',
      'Back / Home / Recent — Navigation'
    ],
    notes: 'Point to each part on your actual phone as you explain.'
  },
  {
    id: 11,
    title: 'Touch Gestures — Live Demo',
    subtitle: 'The language of touchscreens',
    type: 'demo',
    image: gesturesImg,
    gestures: [
      { name: 'Tap', desc: 'Select / Open' },
      { name: 'Tap & Hold', desc: 'More options / Context menu' },
      { name: 'Drag', desc: 'Move items / Scroll slowly' },
      { name: 'Swipe', desc: 'Navigate pages / Dismiss' },
      { name: 'Double Tap', desc: 'Zoom in/out' },
      { name: 'Pinch', desc: 'Zoom in/out (two fingers)' }
    ],
    notes: 'DEMO TIME: Project your phone and demonstrate each gesture live.'
  },
  {
    id: 12,
    title: 'How Computers Work — The IPO Cycle',
    subtitle: 'Input → Process → Output (+ Storage)',
    type: 'image-focus',
    image: ipoCycleImg,
    labels: [
      'Input — Keyboard, mouse, mic, scanner',
      'Process — CPU (CU + ALU + MU)',
      'Output — Monitor, printer, speaker',
      'Storage — RAM (temp) / SSD/HDD (perm)'
    ],
    notes: 'Everything a computer does follows this cycle. Every app, every click.'
  },
  {
    id: 13,
    title: 'CPU — The Brain',
    subtitle: 'Control Unit • ALU • Memory Unit',
    type: 'content',
    image: ipoCycleImg, // Same image as slide 12
    bullets: [
      'Control Unit (CU) — Directs traffic, fetches instructions',
      'Arithmetic Logic Unit (ALU) — Math + logic (add, compare, AND/OR)',
      'Memory Unit (MU) — Temporary holding area during processing',
      'Speed measured in GHz (billions of cycles/second)'
    ],
    notes: 'Same CPU architecture in your phone, laptop, and game console.'
  },
  {
    id: 14,
    title: 'Input vs Output Devices',
    subtitle: 'Getting data in & out',
    type: 'image-focus',
    image: ioDevicesImg,
    labels: [
      'INPUT: Keyboard, Mouse, Scanner, Webcam, Mic, Barcode Reader',
      'OUTPUT: Monitor, Printer, Speakers, Projector, Plotter'
    ],
    notes: 'Class activity: Name each icon — is it input or output?'
  },
  {
    id: 15,
    title: 'Memory & Storage Hierarchy',
    subtitle: 'Speed vs Capacity vs Cost',
    type: 'image-focus',
    image: memoryStorageImg,
    labels: [
      'Registers (CPU) — Fastest, tiny, expensive',
      'Cache (L1/L2/L3) — Ultra-fast, small',
      'RAM — Fast, volatile, working memory',
      'SSD/HDD — Permanent, large, slower',
      'USB/SD — Portable, removable',
      'Cloud — Infinite, network-dependent'
    ],
    notes: 'Analogy: Registers = pocket, RAM = desk, SSD = filing cabinet, Cloud = warehouse.'
  },
  {
    id: 16,
    title: 'Motherboard & Ports — Connect Everything',
    subtitle: 'The highways inside your computer',
    type: 'image-focus',
    image: motherboardPortsImg,
    labels: [
      'USB-C / USB-A — Data, power, video (most versatile)',
      'HDMI — High-def video + audio to monitor/TV',
      'Ethernet — Wired internet (fast, stable)',
      '3.5mm Audio — Headphones, mic, speakers',
      'Power — Barrel or USB-C PD charging'
    ],
    notes: 'Show real cables. USB-C does it all — data, video, power.'
  },
  {
    id: 17,
    title: 'Files & Folders — Digital Organization',
    subtitle: 'Chocolate → Wrapper → Box = Data → File → Folder',
    type: 'demo',
    image: filesFoldersImg,
    steps: [
      'Right-click desktop → New → Folder → Name it',
      'Open folder → Right-click → New → Text Document',
      'Name file → Double-click → Type → Ctrl+S to save',
      'Subfolders: Folder inside folder (Class 3 → Section A → Students.txt)'
    ],
    notes: 'LIVE DEMO: Create a folder and file on the projector right now.'
  },
  {
    id: 18,
    title: 'Browser, Internet & Email',
    subtitle: 'Your gateway to the world',
    type: 'demo',
    image: internetEmailImg,
    bullets: [
      'Browser: Chrome/Edge/Firefox — URL bar, tabs, bookmarks, extensions',
      'Internet: Network of networks — ISP → Modem → Router → You',
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
    image: heroImg, // Same image as slide 1
    takeaways: [
      'ICT = Info + Comm + Tech — powers every sector',
      'Smartphone = Computer in your pocket (IPO cycle applies)',
      'Touch gestures = Universal language of mobile',
      'Files/Folders = Digital organization (chocolate box analogy)',
      'Browser + Search + Email = Your daily digital toolkit'
    ],
    notes: 'Great job! Questions? Practice: Create a folder, save a file, send an email.'
  }
]

// Build presentation steps: each slide becomes 2 steps (image, then content)
// except consecutive slides with same image share the image step
function buildSteps(slides) {
  const steps = []
  let lastImage = null

  for (const slide of slides) {
    const sameImageAsLast = slide.image && slide.image === lastImage

    if (!sameImageAsLast && slide.image) {
      // Image step (full-screen image, minimal text)
      steps.push({
        ...slide,
        phase: 'image',
        stepId: steps.length,
        isImageStep: true
      })
      lastImage = slide.image
    } else if (!slide.image) {
      // No image slide (like tools) - just go straight to content
      lastImage = null
    }

    // Content step (image stays, text appears)
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

function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [progress, setProgress] = useState(0)
  const [bgImageKey, setBgImageKey] = useState(0)

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
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          e.preventDefault()
          nextStep()
          break
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault()
          prevStep()
          break
        case 'Home':
          e.preventDefault()
          goToStep(0)
          break
        case 'End':
          e.preventDefault()
          goToStep(totalSteps - 1)
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
  }, [currentStep, totalSteps, showControls])

  // Progress calculation (based on base slides)
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

  const nextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1))
  }, [totalSteps])

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }, [])

  const goToStep = useCallback((index) => {
    setCurrentStep(Math.max(0, Math.min(index, totalSteps - 1)))
  }, [totalSteps])

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

  const renderStepContent = () => {
    // Image step: show only image with title/subtitle, no content
    if (isImageStep) {
      return (
        <div className="slide-image-only">
          <h1>{step.title}</h1>
          <h2>{step.subtitle}</h2>
          {step.id === 1 && (
            <div className="credit-line">
              Made by Bablade Legend · From Bablade Studios
            </div>
          )}
          <div className="image-hint">Press <kbd>Space</kbd> or <kbd>→</kbd> to continue</div>
        </div>
      )
    }

    // Content step: render based on type
    switch (step.type) {
      case 'title':
        return (
          <div className="slide-title">
            <h1>{step.title}</h1>
            <h2>{step.subtitle}</h2>
            <div className="credit-line">
              Made by Bablade Legend · From Bablade Studios
            </div>
            <p className="slide-notes">{step.notes}</p>
          </div>
        )
      case 'content':
        return (
          <div className="slide-content">
            <h1>{step.title}</h1>
            <h2>{step.subtitle}</h2>
            <ul>
              {step.bullets?.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
            <p className="slide-notes">{step.notes}</p>
          </div>
        )
      case 'grid':
        return (
          <div className="slide-grid">
            <h1>{step.title}</h1>
            <h2>{step.subtitle}</h2>
            <div className="sectors-grid">
              {step.sectors?.map((sector, i) => (
                <div key={i} className="sector-card">
                  <span className="sector-icon">{sector.icon}</span>
                  <span className="sector-name">{sector.name}</span>
                </div>
              ))}
            </div>
            <p className="slide-notes">{step.notes}</p>
          </div>
        )
      case 'tools':
        return (
          <div className="slide-tools">
            <h1>{step.title}</h1>
            <h2>{step.subtitle}</h2>
            <div className="tools-grid">
              {step.tools?.map((tool, i) => (
                <div key={i} className="tool-card">
                  <h3>{tool.name}</h3>
                  <p>{tool.desc}</p>
                </div>
              ))}
            </div>
            <p className="slide-notes">{step.notes}</p>
          </div>
        )
      case 'image-focus':
        return (
          <div className="slide-image-focus">
            <h1>{step.title}</h1>
            <h2>{step.subtitle}</h2>
            <ul className="labels">
              {step.labels?.map((label, i) => (
                <li key={i}>{label}</li>
              ))}
            </ul>
            <p className="slide-notes">{step.notes}</p>
          </div>
        )
      case 'demo':
        return (
          <div className="slide-demo">
            <h1>{step.title}</h1>
            <h2>{step.subtitle}</h2>
            <div className="demo-badge">🎬 LIVE DEMO</div>
            {step.gestures && (
              <ul className="gestures">
                {step.gestures.map((g, i) => (
                  <li key={i}>
                    <strong>{g.name}</strong> — {g.desc}
                  </li>
                ))}
              </ul>
            )}
            {step.steps && (
              <ol className="steps">
                {step.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            )}
            {step.bullets && (
              <ul>
                {step.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
            <p className="slide-notes">{step.notes}</p>
          </div>
        )
      case 'recap':
        return (
          <div className="slide-recap">
            <h1>{step.title}</h1>
            <h2>{step.subtitle}</h2>
            <ol className="takeaways">
              {step.takeaways?.map((t, i) => (
                <li key={i}>
                  <span className="takeaway-number">{i + 1}</span>
                  {t}
                </li>
              ))}
            </ol>
            <p className="slide-notes">{step.notes}</p>
          </div>
        )
      default:
        return null
    }
  }

  // Determine slide number display (1-based for base slides)
  const displaySlideNumber = step.id
  const totalSlides = baseSlides.length

  return (
    <div className="presentation-app">
      {/* Progress bar at top */}
      <div className="progress-bar" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Slide container */}
      <div className="slide-container">
        {/* Background image - only show if step has image */}
        {step.image && (
          <div
            key={bgImageKey}
            className={`slide-bg ${isImageStep ? 'image-step' : 'content-step'}`}
            style={{ backgroundImage: `url(${step.image})` }}
            aria-hidden="true"
          />
        )}

        {/* Slide content */}
        <div className="slide-wrapper">
          <div key={currentStep} className="slide-content-wrapper">
            {renderStepContent()}
          </div>

          {/* Slide number */}
          <div className="slide-number" aria-label={`Slide ${displaySlideNumber} of ${totalSlides}${isImageStep ? ' (image)' : ''}`}>
            {displaySlideNumber} / {totalSlides}
            {isImageStep && <span className="phase-indicator">📷</span>}
          </div>
        </div>
      </div>

      {/* Bottom-left controls */}
      <div className={`controls ${showControls ? 'visible' : 'hidden'}`} role="navigation" aria-label="Presentation controls">
        <div className="controls-inner">
          <button
            className="control-btn"
            onClick={() => goToStep(0)}
            disabled={currentStep === 0}
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
            onClick={prevStep}
            disabled={currentStep === 0}
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
            {isImageStep && <span className="phase-badge">IMG</span>}
          </div>

          <button
            className="control-btn"
            onClick={nextStep}
            disabled={currentStep === totalSteps - 1}
            aria-label="Next step (Right arrow)"
            title="Next (→)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <button
            className="control-btn"
            onClick={() => goToStep(totalSteps - 1)}
            disabled={currentStep === totalSteps - 1}
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