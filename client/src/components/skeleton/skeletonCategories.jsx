import React from 'react'
import ContentLoader from 'react-content-loader'


const SkeletonCategories = props => (
    <ContentLoader
        width={1200}
        viewBox="0 0 1200 470"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="70" y="60" rx="2" ry="2" width="350" height="400" />
        <rect x="435" y="60" rx="2" ry="2" width="350" height="400" />
        <rect x="800" y="60" rx="2" ry="2" width="350" height="400" />

    </ContentLoader>
)

export default SkeletonCategories