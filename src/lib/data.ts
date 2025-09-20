import type { Maid, Booking, Notification } from './types';

const maids: Maid[] = [
  {
    id: '1',
    name: 'Reshmi',
    services: ['cooking', 'meal prep', 'kitchen cleaning'],
    monthly_rate: 3800,
    rating: 4.8,
    verified: true,
    image_url: 'https://picsum.photos/seed/woman-cooking/300/300',
    description: 'A fantastic cook, Reshmi specializes in preparing delicious and healthy home-style meals. She is an expert in various cuisines and maintains a spotless kitchen.'
  },
  {
    id: '2',
    name: 'Maria',
    services: ['deep cleaning', 'washing bathrooms', 'sweeping', 'mopping'],
    monthly_rate: 3200,
    rating: 4.6,
    verified: true,
    image_url: 'https://picsum.photos/seed/woman-cleaning/300/300',
    description: 'Maria is a deep cleaning specialist who prides herself on leaving every corner of your home, especially bathrooms, sparkling clean. She is efficient and reliable.'
  },
  {
    id: '3',
    name: 'Shruti',
    services: ['sweeping', 'mopping', 'washing utensils', 'dusting'],
    monthly_rate: 2800,
    rating: 4.5,
    verified: true,
    image_url: 'https://picsum.photos/seed/woman-sweeping/300/300',
    description: 'Shruti is diligent and efficient, ensuring your floors are always pristine. She handles daily sweeping, mopping, and other general cleaning tasks with great care.'
  },
  {
    id: '4',
    name: 'Gita',
    services: ['cleaning', 'laundry', 'washing bathrooms'],
    monthly_rate: 2800,
    rating: 4.6,
    verified: true,
    image_url: 'https://picsum.photos/seed/indian-woman-4/300/300',
    description: 'Gita is hardworking and meticulous. She excels at general house cleaning and laundry services, ensuring your clothes are fresh and your home is tidy.'
  },
  {
    id: '5',
    name: 'Meena',
    services: ['elderly care', 'cooking'],
    monthly_rate: 3500,
    rating: 4.9,
    verified: true,
    image_url: 'https://picsum.photos/seed/indian-woman-5/300/300',
    description: 'Meena is a compassionate caregiver with experience in assisting the elderly. She combines this with her cooking skills to provide holistic support.'
  },
  {
    id: '6',
    name: 'Priya',
    services: ['deep cleaning', 'organizing'],
    monthly_rate: 4500,
    rating: 4.7,
    verified: false,
    image_url: 'https://picsum.photos/seed/indian-woman-6/300/300',
    description: 'Priya specializes in deep cleaning and home organization. She can transform cluttered spaces into neat, functional areas. Currently awaiting verification.'
  }
];

const bookings: Booking[] = [
    {
        id: 'b1',
        user_phone: 'client123',
        maid_id: '1',
        date: '2024-08-10',
        time_slot: '09:00 - 12:00',
        status: 'completed',
        created_at: '2024-08-01T10:00:00Z',
    },
    {
        id: 'b2',
        user_phone: 'client123',
        maid_id: '3',
        date: '2024-08-15',
        time_slot: '14:00 - 17:00',
        status: 'accepted',
        created_at: '2024-08-05T11:00:00Z',
    },
    {
        id: 'b3',
        user_phone: 'client456',
        maid_id: '1',
        date: '2024-08-20',
        time_slot: '10:00 - 13:00',
        status: 'pending',
        created_at: '2024-08-18T09:30:00Z',
    },
    {
        id: 'b4',
        user_phone: 'client789',
        maid_id: '2',
        date: '2024-08-12',
        time_slot: '09:00 - 11:00',
        status: 'rejected',
        created_at: '2024-08-10T15:00:00Z',
    }
];

const notifications: Notification[] = [
    {
        id: 'n1',
        maid_id: '1',
        booking_id: 'b3',
        title: 'New Booking Request',
        body: 'You have a new booking request from client456 for August 20, 2024.',
        read: false,
        created_at: '2024-08-18T09:31:00Z',
    },
    {
        id: 'n2',
        maid_id: '3',
        booking_id: 'b2',
        title: 'Booking Accepted',
        body: 'You accepted the booking from client123.',
        read: true,
        created_at: '2024-08-05T11:05:00Z',
    }
];


// --- API-like functions to simulate data fetching ---

export function getMaids(verifiedOnly = true): Maid[] {
  if (verifiedOnly) {
    return maids.filter(maid => maid.verified);
  }
  return maids;
}

export function getMaidById(id: string): Maid | undefined {
  return maids.find(maid => maid.id === id);
}

export function getBookingsByClient(user_phone: string): Booking[] {
  return bookings
    .filter(b => b.user_phone === user_phone)
    .map(b => ({ ...b, maid: getMaidById(b.maid_id) }))
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function getBookingsByMaid(maid_id: string): Booking[] {
  return bookings
    .filter(b => b.maid_id === maid_id)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function getNotificationsByMaid(maid_id: string): Notification[] {
  return notifications
    .filter(n => n.maid_id === maid_id)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function createBooking(bookingData: Omit<Booking, 'id' | 'created_at' | 'status'>): Booking {
  const newBooking: Booking = {
    ...bookingData,
    id: `b${Date.now()}`,
    created_at: new Date().toISOString(),
    status: 'pending',
  };
  bookings.push(newBooking);
  
  // Simulate creating a notification
  const newNotification: Notification = {
    id: `n${Date.now()}`,
    maid_id: newBooking.maid_id,
    booking_id: newBooking.id,
    title: 'New Booking Request',
    body: `New booking for ${newBooking.date} at ${newBooking.time_slot}.`,
    read: false,
    created_at: new Date().toISOString(),
  };
  notifications.unshift(newNotification);

  return newBooking;
}

export function updateBookingStatus(bookingId: string, status: 'accepted' | 'rejected'): Booking | undefined {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
        booking.status = status;
        // Optionally create a notification for the client here
    }
    return booking;
}
