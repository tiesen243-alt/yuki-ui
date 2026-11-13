import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'

const VARIANTS = [
  { value: 'default', label: 'Default' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'destructive', label: 'Destructive' },
  { value: 'outline', label: 'Outline' },
  { value: 'ghost', label: 'Ghost' },
  { value: 'link', label: 'Link' },
] as const

export default function Home() {
  return (
    <main className='container mx-auto p-4'>
      <div className='flex flex-col gap-4'>
        {VARIANTS.map((variant) => (
          <Button key={variant.value} variant={variant.value}>
            {variant.label}
          </Button>
        ))}
      </div>

      <Select items={VARIANTS}>
        <SelectTrigger placeholder='Select a variant' />

        <SelectContent>
          {VARIANTS.map((variant) => (
            <SelectItem key={variant.value} value={variant.value}>
              {variant.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </main>
  )
}
