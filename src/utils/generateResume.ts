import { jsPDF } from 'jspdf'
import type { PortfolioData } from '../types/portfolio'

export function downloadResume(data: PortfolioData) {
  const doc = new jsPDF()
  let y = 20
  const margin = 20
  const pageWidth = doc.internal.pageSize.width

  const addText = (text: string, size: number, isBold = false, increment = 6) => {
    doc.setFontSize(size)
    doc.setFont('helvetica', isBold ? 'bold' : 'normal')
    const lines = doc.splitTextToSize(text, pageWidth - margin * 2)
    doc.text(lines, margin, y)
    y += lines.length * increment
  }

  // Header
  addText(data.profile.name, 22, true, 10)
  addText(data.profile.role, 14, false, 8)
  
  // Contact
  const contactInfo = `${data.profile.email}  |  ${data.profile.phone}  |  ${data.profile.location}`
  addText(contactInfo, 10, false, 12)
  
  // Divider
  doc.setLineWidth(0.5)
  doc.line(margin, y - 5, pageWidth - margin, y - 5)
  y += 5

  // About
  addText('ABOUT ME', 12, true, 8)
  data.about.paragraphs.forEach(p => {
    addText(p, 10, false, 5)
  })
  y += 5

  // Experience
  addText('PROFESSIONAL EXPERIENCE', 12, true, 8)
  data.workExperiences.forEach(exp => {
    addText(`${exp.title} - ${exp.organization}`, 11, true, 6)
    addText(exp.date, 10, false, 6)
    exp.details.forEach(detail => {
      addText(`* ${detail}`, 10, false, 5)
    })
    y += 4
  })
  y += 3

  addText('INTERNSHIPS', 12, true, 8)
  data.experiences.forEach(exp => {
    addText(`${exp.title} - ${exp.organization}`, 11, true, 6)
    addText(exp.date, 10, false, 6)
    exp.details.forEach(detail => {
      addText(`* ${detail}`, 10, false, 5)
    })
    y += 4
  })
  y += 3

  // Education
  addText('EDUCATION', 12, true, 8)
  data.education.forEach(edu => {
    addText(`${edu.title} - ${edu.organization}`, 11, true, 6)
    addText(edu.date, 10, false, 7)
  })
  y += 3

  // Skills
  addText('SKILLS', 12, true, 8)
  data.skillGroups.forEach(group => {
    addText(`${group.title}: ${group.skills.join(', ')}`, 10, false, 6)
  })

  // Save PDF
  const filename = data.profile.name.toLowerCase().replace(/\s+/g, '-') + '-resume.pdf'
  doc.save(filename)
}
