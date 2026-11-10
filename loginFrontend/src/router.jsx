import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

function DefaultPendingComponent() {
    return <div className="pending-component">Loading...</div>
}

const router = createRouter({
    routeTree,
    defaultPendingComponent: DefaultPendingComponent,
})

export { router }