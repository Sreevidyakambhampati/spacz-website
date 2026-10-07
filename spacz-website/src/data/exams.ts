export interface Exam {
  name: string
  track: string
  needs: string[]
}

// What aspirants preparing for each exam tend to look for in a space.
export const exams: Exam[] = [
  { name: 'UPSC', track: 'Civil Services', needs: ['Long-hour access', 'Newspaper corner', 'Lockers for heavy notes'] },
  { name: 'GATE', track: 'Engineering', needs: ['Reliable Wi-Fi', 'Power backup', 'Quiet problem-solving desks'] },
  { name: 'JEE', track: 'Engineering entrance', needs: ['Early-morning hours', 'Close to coaching', 'Well-lit desks'] },
  { name: 'NEET', track: 'Medical entrance', needs: ['Silent zones', 'A/C halls', 'Lockers for reference books'] },
  { name: 'IBPS PO', track: 'Banking', needs: ['Wi-Fi for mock tests', 'Flexible 15-day plans', 'Near transit'] },
  { name: 'IBPS Clerk', track: 'Banking', needs: ['Affordable daily pricing', 'Wi-Fi for mocks', 'Near home'] },
  { name: 'RBI Grade B', track: 'Banking', needs: ['Newspaper corner', 'Long-hour access', 'Quiet cabins'] },
  { name: 'SSC CGL', track: 'Staff Selection', needs: ['Affordable seats', 'Wi-Fi for mocks', 'Morning slots'] },
  { name: 'State PSC', track: 'State services', needs: ['Newspaper corner', 'Long-hour access', 'Lockers'] },
  { name: 'CAT', track: 'Management', needs: ['Wi-Fi', 'Cabins for timed mocks', 'Evening hours'] },
  { name: 'CLAT', track: 'Law', needs: ['Newspaper corner', 'Quiet reading desks', 'Daylight'] },
  { name: 'EAMCET', track: 'State entrance', needs: ['Close to coaching', 'Affordable seats', 'Early hours'] },
]
