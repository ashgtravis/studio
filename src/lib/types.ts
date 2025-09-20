export type Maid = {
  id: string;
  name: string;
  services: string[];
  monthly_rate: number;
  rating: number;
  verified: boolean;
  image_url: string;
  description: string;
};

export type Booking = {
  id: string;
  user_phone: string;
  maid_id: string;
  maid?: Maid;
  date: string;
  time_slot: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  created_at: string;
};

export type Notification = {
  id: string;
  maid_id: string;
  booking_id: string;
  title: string;
  body: string;
  read: boolean;
  created_at: string;
};
