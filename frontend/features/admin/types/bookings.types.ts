export type BookingStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed'

export type Booking = {
  id: number
  tour: { id: number; name: string } | null
  fullName: string
  email: string
  phone: string
  country: string
  chosenDate: string
  adults: number
  children: number
  status: BookingStatus
  createdAt: string | null
}
