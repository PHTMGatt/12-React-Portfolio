import WorkItem from './Workitem'
import './style.css'
import pic01 from '../../assets/pix/code1.avif'
import pic02 from '../../assets/pix/code2.jpg'
import pic03 from '../../assets/pix/photo-1576836165612-8bc9b07e7778.avif'
import pic04 from '../../assets/pix/photo-1584949091598-c31daaaa4aa9.avif'
import pic05 from '../../assets/pix/photo-1594904351111-a072f80b1a71.avif'
import pic06 from '../../assets/pix/smoke.jpg'



const previousWorks = [
    {
      id: 1,
      description: 'Project 1 - HTML',
      link: 'https://github.com/PHTMGatt/01-HTML',
      screenshot: pic01,
    },
    {
      id: 2,
      description: 'Project 2 - ADVANCED CSS',
      link: 'https://github.com/PHTMGatt/02-Advanced-CSS',
      screenshot: pic02,
    },
    {
      id: 3,
      description: 'Project 3 - JAVASCRIPT',
      link: 'https://github.com/PHTMGatt/03-JavaScript',
      screenshot: pic03,
    },
    {
      id: 7,
      description: 'Project 7 - NODEJS',
      link: 'https://github.com/PHTMGatt/07-Readme-Gen',
      screenshot: pic04,
    },
    {
      id: 8,
      description: 'Project 8 - TS & OOP',
      link: 'https://github.com/PHTMGatt/08-Car-Truck-Motorbike',
      screenshot: pic05,
    },
    {
      id: 9,
      description: 'Project 9 - SERVERS AND APIS',
      link: 'https://github.com/PHTMGatt/09-Weather-App',
      screenshot: pic06,
    },
]

const Work = () => {
  return (
    <div className="work-grid">
      {previousWorks.map((work) => (
        <WorkItem
          key={work.id}
          description={work.description}
          link={work.link}
          screenshot={work.screenshot}
        />
      ))}
    </div>
  )
}

export default Work