import React from 'react'
import ContentLoader from 'react-content-loader'

const ImageGrid = props => (
    <ContentLoader
        width={1220}
        height={575}
        viewBox="0 0 1220 575"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="1060" y="47" rx="2" ry="2" width="60" height="16" />
        <rect x="240" y="50" rx="2" ry="2" width="667" height="20" />
        <rect x="0" y="50" rx="2" ry="2" width="170" height="300" />

        <rect x="240" y="97" rx="2" ry="2" width="270" height="270" />
        <rect x="240" y="385" rx="2" ry="2" width="120" height="20" />
        <rect x="450" y="385" rx="2" ry="2" width="50" height="20" />
        <rect x="240" y="420" rx="2" ry="2" width="50" height="20" />

        <rect x="550" y="97" rx="2" ry="2" width="270" height="270" />
        <rect x="550" y="385" rx="2" ry="2" width="120" height="20" />
        <rect x="760" y="385" rx="2" ry="2" width="50" height="20" />
        <rect x="550" y="420" rx="2" ry="2" width="50" height="20" />

        <rect x="860" y="97" rx="2" ry="2" width="270" height="270" />
        <rect x="860" y="385" rx="2" ry="2" width="120" height="20" />
        <rect x="1070" y="385" rx="2" ry="2" width="50" height="20" />
        <rect x="860" y="420" rx="2" ry="2" width="50" height="20" />

        <rect x="240" y="485" rx="2" ry="2" width="270" height="270" />
        <rect x="550" y="485" rx="2" ry="2" width="270" height="270" />
        <rect x="860" y="485" rx="2" ry="2" width="270" height="270" />

    </ContentLoader>
)

export default ImageGrid