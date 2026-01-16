import React from 'react'
import './FeatureListItem.css'

interface FeatureListItemProps {
  icon: React.ReactNode
  title: string
  description: string
}

export default function FeatureListItem({ icon, title, description }: FeatureListItemProps) {
  return (
    <div className="feature-list-item">
      <div className="feature-list-item-icon">
        {icon}
      </div>
      <div className="feature-list-item-content">
        <h3 className="feature-list-item-title">{title}</h3>
        <p className="feature-list-item-description">{description}</p>
      </div>
    </div>
  )
}
