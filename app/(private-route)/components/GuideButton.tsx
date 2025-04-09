import { Tooltip } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useTour } from '@reactour/tour';
import { CircleHelp } from 'lucide-react';

export default function GuideButton() {
  const {setIsOpen} = useTour() 
  const handleTour = () => {
    localStorage.setItem('tour', 'done')
    setIsOpen(true)
  }
  return (
    <div className='absolute bottom-4 right-4 '>
      <Tooltip
        trigger={<CircleHelp className={cn('animate-bounce')} onClick={handleTour}>GuideButton</CircleHelp>}
        content={<p>Guide</p>}
      />
    </div>
  )
}
