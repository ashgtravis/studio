export type Maid = {
  id: string;
  name: string;
  services: string[];
  monthly_rate: number;
  rating: number;
  avg_rating: number;
  reliability_score: number;
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

export type Review = {
  id: string;
  booking_id: string;
  client_id: string;
  maid_id: string;
  rating: number;
  comment: string;
  created_at: string;
};

export type Attendance = {
    id: string;
    booking_id: string;
    maid_id: string;
    client_id: string;
    date: string;
    status: 'present' | 'absent';
    created_at: string;
}
