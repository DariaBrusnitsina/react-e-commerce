import React from 'react'
import ContentLoader from 'react-content-loader'


const SkeletonHomeFirst = props => (
    <ContentLoader
        width={700}
        viewBox="0 0 700 1050"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="120" y="20" rx="0" ry="0" width="470" height="470" />
        <rect x="120" y="505" rx="2" ry="2" width="200" height="20" />
        <rect x="120" y="540" rx="2" ry="2" width="50" height="20" />

        <rect x="120" y="608" rx="0" ry="0" width="350" height="350" />
        <rect x="120" y="975" rx="2" ry="2" width="270" height="20" />
        <rect x="120" y="1010" rx="2" ry="2" width="50" height="20" />

    </ContentLoader>
)

export default SkeletonHomeFirst