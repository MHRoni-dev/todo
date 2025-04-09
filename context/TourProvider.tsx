import steps from '@/lib/steps'
import {TourProvider as ReactTourProvider} from '@reactour/tour'

export default function TourProvider({children}: {children: React.ReactNode}) {
  return (
    <ReactTourProvider steps={steps} disableDotsNavigation badgeContent={({totalSteps, currentStep}) => `${currentStep + 1}/${totalSteps}`} className=' dark:!bg-neutral-900' >
      {children}
    </ReactTourProvider>
  )
}
