import { lazy, Suspense } from 'react'
import { useDevice } from '@/hooks/useDevice'
import { useLenis } from '@/hooks/useLenis'
import { useSectionObserver } from '@/hooks/useSectionObserver'
import { useAppStore } from '@/store/useAppStore'
import { CustomCursor } from '@/components/cursor/CustomCursor'
import { IngressLoader } from '@/components/loader/IngressLoader'
import { SiteNav } from '@/components/nav/SiteNav'
import { UniverseDetail } from '@/components/gallery/UniverseDetail'
import { Hero } from '@/components/sections/Hero'
import { MultiverseSection } from '@/components/sections/MultiverseSection'
import { BelongSection } from '@/components/sections/BelongSection'
import { CollectSection } from '@/components/sections/CollectSection'
import { StoreSection } from '@/components/sections/StoreSection'
import { ArtistsSection } from '@/components/sections/ArtistsSection'
import { VoiceSection } from '@/components/sections/VoiceSection'
import { Footer } from '@/components/sections/Footer'

const MultiverseScene = lazy(() =>
  import('@/scenes/MultiverseScene').then((m) => ({ default: m.MultiverseScene })),
)

export default function App() {
  useDevice()
  useLenis()
  useSectionObserver()

  const isLoaded = useAppStore((s) => s.isLoaded)

  return (
    <>
      <IngressLoader />
      <CustomCursor />
      <div className="grain" aria-hidden />
      <div className="vignette" aria-hidden />

      {isLoaded && (
        <Suspense fallback={null}>
          <MultiverseScene />
        </Suspense>
      )}
      <SiteNav />
      <UniverseDetail />

      <main className={`content-layer ${isLoaded ? 'is-ready' : ''}`}>
        <Hero />
        <MultiverseSection />
        <BelongSection />
        <CollectSection />
        <StoreSection />
        <ArtistsSection />
        <VoiceSection />
        <Footer />
      </main>
    </>
  )
}
