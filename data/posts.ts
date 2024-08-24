import { Post } from "@/types/posts";

const posts: Post[]=[
    {
      id: '1',
      title: 'The Rise of Artificial Intelligence',
      body: 'Artificial Intelligence (AI) is revolutionizing various industries...',
      author: 'John Doe',
      date: '2024-05-01',
      comments: [
        {
          id: '1',
          text: 'Great introduction!',
          username: 'Jane'
        },
        {
          id: '2',
          text: 'Looking forward to more posts on this topic.',
          username: 'Alex'
        }
      ]
    },
    {
      id: '2',
      title: 'Exploring the Future of Renewable Energy',
      body: 'Renewable energy sources like solar and wind are becoming more cost-effective...',
      author: 'Emily Smith',
      date: '2024-06-15',
      comments: [
        {
          id: '3',
          text: 'Very insightful, thanks for sharing.',
          username: 'Sam'
        },
        {
          id: '4',
          text: 'Could you also discuss the impact of renewables on wildlife?',
          username: 'Max'
        }
      ]
    },
    {
      id: '3',
      title: 'The Impact of Blockchain Technology on Finance',
      body: 'Blockchain is set to change the way we think about financial security...',
      author: 'Alice Johnson',
      date: '2024-07-20',
      comments: [
        {
          id: '5',
          text: 'Can this technology also secure personal data?',
          username: 'Bob'
        }
      ]
    },
    {
      id: '4',
      title: 'Advancements in Robotic Surgery',
      body: 'Robotic surgery is enhancing precision in the operating room...',
      author: 'Dr. Mark Lee',
      date: '2024-08-05',
      comments: []
    },
    {
      id: '5',
      title: 'Understanding Quantum Computing',
      body: 'Quantum computing could soon outpace traditional computing in speed and efficiency...',
      author: 'Dr. Susan Choi',
      date: '2024-08-25',
      comments: [
        {
          id: '6',
          text: 'This sounds like sci-fi. Is it actually real?',
          username: 'Phil'
        },
        {
          id: '7',
          text: 'How can I start a career in quantum computing?',
          username: 'Linda'
        }
      ]
    },
    {
      id: '6',
      title: 'The Future of Self-Driving Cars',
      body: 'Self-driving cars are closer to becoming a common sight on our roads...',
      author: 'Tom Harris',
      date: '2024-09-10',
      comments: []
    },
    {
      id: '7',
      title: 'Innovations in Wearable Technology',
      body: 'Wearable tech is not just about fitness trackers anymore...',
      author: 'Sarah Connor',
      date: '2024-10-01',
      comments: [
        {
          id: '8',
          text: 'Wearable tech in healthcare sounds promising.',
          username: 'Karen'
        }
      ]
    },
    {
      id: '8',
      title: 'Breaking Down Machine Learning',
      body: 'Machine learning is at the heart of many AI applications today...',
      author: 'James King',
      date: '2024-11-21',
      comments: [
        {
          id: '9',
          text: 'Could machine learning help in education?',
          username: 'Anita'
        }
      ]
    },
    {
      id: '9',
      title: 'The Psychology of Virtual Reality',
      body: 'Virtual reality is changing the way we experience digital content...',
      author: 'Dr. Rachel Peterson',
      date: '2024-12-15',
      comments: [
        {
          id: '10',
          text: 'Interesting perspective, thanks!',
          username: 'Mike'
        }
      ]
    },
    {
      id: '10',
      title: 'Exploring Space with New Technologies',
      body: 'New technology is making it easier and cheaper to explore space...',
      author: 'Neil Armstrong Jr.',
      date: '2025-01-05',
      comments: [
        {
          id: '11',
          text: 'Hope to see more countries participate in space exploration.',
          username: 'Diana'
        }
      ]
    }
  ];

export default posts;