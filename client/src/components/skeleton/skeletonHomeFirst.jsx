import React from 'react'
import ContentLoader from 'react-content-loader'


const SkeletonHomeFirst = props => (
    <ContentLoader
        width={700}
        viewBox="0 0 700 1200"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="20" y="20" rx="2" ry="2" width="370" height="370" />
        <rect x="20" y="410" rx="2" ry="2" width="200" height="20" />
        <rect x="20" y="440" rx="2" ry="2" width="50" height="20" />

        <rect x="20" y="508" rx="2" ry="2" width="570" height="570" />
        <rect x="20" y="1095" rx="2" ry="2" width="170" height="20" />
        <rect x="20" y="1130" rx="2" ry="2" width="60" height="20" />

    </ContentLoader>
)

export default SkeletonHomeFirst