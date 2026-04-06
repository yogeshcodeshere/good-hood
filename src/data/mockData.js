export const CAT_CFG = {
  blood:      { color: '#EF4444', label: 'Blood Drive' },
  plantation: { color: '#22C55E', label: 'Plantation' },
  cleanup:    { color: '#06B6D4', label: 'Cleanup' },
  social:     { color: '#F59E0B', label: 'Social Help' },
  awareness:  { color: '#8B5CF6', label: 'Awareness' },
};

export const EVENTS = [
  { id: 1, cat: 'blood', title: 'City Blood Drive', desc: 'Help save lives by donating blood at Kharghar hospital\'s quarterly camp. Every drop counts.', loc: 'Kharghar, Navi Mumbai', date: 'Apr 5', time: '9 AM – 1 PM', joined: 48, total: 100, pts: 150, days: 7, organizer: 'NSS Cell, NMMC', reqs: ['Age 18–65', 'Weight > 50 kg', 'No recent illness', 'Carry photo ID'] },
  { id: 2, cat: 'plantation', title: 'Green Panvel Drive', desc: 'Plant saplings along the Panvel highway and help restore our urban greenery.', loc: 'Panvel, Maharashtra', date: 'Apr 8', time: '7 AM – 11 AM', joined: 35, total: 60, pts: 100, days: 10, organizer: 'Panvel Nature Society', reqs: ['Comfortable clothing', 'Bring water bottle'] },
  { id: 3, cat: 'cleanup', title: 'Belapur Beach Cleanup', desc: 'Community effort to clean our coastline and protect marine life from plastic waste and debris.', loc: 'Belapur Beach, CBD', date: 'Apr 12', time: '6 AM – 9 AM', joined: 72, total: 120, pts: 120, days: 14, organizer: 'Ocean Warriors NGO', reqs: ['Wear old clothes', 'Bring sunscreen'] },
  { id: 4, cat: 'social', title: 'Clothes Donation Camp', desc: 'Donate unused clothes for underprivileged families in the region before the summer season.', loc: 'Sector 15, Kharghar', date: 'Apr 6', time: '10 AM – 5 PM', joined: 25, total: 50, pts: 80, days: 8, organizer: 'Helping Hands Trust', reqs: ['Washed clothing only', 'Label by size if possible'] },
  { id: 5, cat: 'awareness', title: 'Cyber Safety Workshop', desc: 'Free workshop on internet safety, phishing awareness, and data protection for all ages.', loc: 'Community Hall, Ulwe', date: 'Apr 15', time: '4 PM – 6 PM', joined: 18, total: 80, pts: 60, days: 17, organizer: 'SafeNet India', reqs: ['Register online', 'Bring your smartphone'] },
  { id: 6, cat: 'blood', title: 'World Blood Donor Day', desc: 'Special drive in honour of World Blood Donor Day. Multiple donation centres across Navi Mumbai.', loc: 'Multiple Centres, NM', date: 'Jun 14', time: '8 AM – 6 PM', joined: 90, total: 200, pts: 200, days: 77, organizer: 'Red Cross India', reqs: ['Valid ID required', 'Eat well before coming'] },
];

export const LEADERBOARD = [
  { id: 1, name: 'Priya Nair', pts: 1240, events: 14, badges: 8, streak: 5, avatar: 'PN', color: '#EC4899', cat: 'cleanup' },
  { id: 2, name: 'Arjun Shah', pts: 980, events: 11, badges: 6, streak: 12, avatar: 'AS', color: '#3B82F6', cat: 'blood', you: true },
  { id: 3, name: 'Meera Joshi', pts: 860, events: 9, badges: 4, streak: 3, avatar: 'MJ', color: '#8B5CF6', cat: 'plantation' },
  { id: 4, name: 'Rohan Kulkarni', pts: 720, events: 8, badges: 3, streak: 2, avatar: 'RK', color: '#F59E0B', cat: 'social' },
  { id: 5, name: 'Sunita Rao', pts: 680, events: 7, badges: 2, streak: 1, avatar: 'SR', color: '#EF4444', cat: 'awareness' },
  { id: 6, name: 'Kiran Mehta', pts: 590, events: 6, badges: 2, streak: 4, avatar: 'KM', color: '#06B6D4', cat: 'cleanup' },
  { id: 7, name: 'Deepak Sharma', pts: 420, events: 5, badges: 1, streak: 0, avatar: 'DS', color: '#22C55E', cat: 'plantation' },
  { id: 8, name: 'Aditi Verma', pts: 390, events: 4, badges: 1, streak: 0, avatar: 'AV', color: '#8B5CF6', cat: 'social' },
  { id: 9, name: 'Sanjay Gupta', pts: 310, events: 4, badges: 0, streak: 0, avatar: 'SG', color: '#EF4444', cat: 'blood' },
  { id: 10, name: 'Nisha Singh', pts: 280, events: 3, badges: 0, streak: 0, avatar: 'NS', color: '#F59E0B', cat: 'awareness' },
  { id: 11, name: 'Rahul Dev', pts: 220, events: 2, badges: 0, streak: 0, avatar: 'RD', color: '#06B6D4', cat: 'cleanup' },
  { id: 12, name: 'Manish Iyer', pts: 150, events: 2, badges: 0, streak: 0, avatar: 'MI', color: '#22C55E', cat: 'plantation' },
];

export const BADGES = [
  { id: '1', title: 'Early Adopter', desc: 'Joined during the first year', icon: '🚀', color: '#8B5CF6' },
  { id: '2', title: '10 Events', desc: 'Participated in 10+ events', icon: '🏆', color: '#F59E0B' },
  { id: '3', title: 'Eco Warrior', desc: 'Completed 5 plantation drives', icon: '🌿', color: '#22C55E' },
  { id: '4', title: 'Life Saver', desc: 'Donated blood twice', icon: '🩸', color: '#EF4444' },
  { id: '5', title: 'Beach Cleaner', desc: 'Saved marine life', icon: '🌊', color: '#06B6D4' },
  { id: '6', title: 'Awareness Pro', desc: 'Attended 3 workshops', icon: '💡', color: '#EC4899' },
];

export const ACTIVITY_TIMELINE = [
  { id: 1, type: 'badge', title: 'Earned 10 Events Badge', time: '2 days ago', color: '#F59E0B' },
  { id: 2, type: 'event', title: 'Joined Green Panvel Drive', time: '1 week ago', color: '#22C55E' },
  { id: 3, type: 'post', title: 'Shared photos from Beach Cleanup', time: '2 weeks ago', color: '#06B6D4' },
  { id: 4, type: 'event', title: 'Joined City Blood Drive', time: '3 weeks ago', color: '#EF4444' },
  { id: 5, type: 'badge', title: 'Earned Life Saver Badge', time: '1 month ago', color: '#EF4444' }
];

export const HEATMAP_DATA = Array.from({ length: 84 }, () => Math.floor(Math.random() * 5));

export const CATS = ['all', 'blood', 'plantation', 'cleanup', 'social', 'awareness'];
