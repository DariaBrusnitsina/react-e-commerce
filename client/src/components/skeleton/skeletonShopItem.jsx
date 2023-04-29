import React from 'react'
import ContentLoader from 'react-content-loader'


const SkeletonShopItem = props => (
    <ContentLoader
        width={1350}
        height={650}
        viewBox="0 0 1350 650"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="100" y="50" rx="2" ry="2" width="1220" height="560" />
    </ContentLoader>
)

export default SkeletonShopItem