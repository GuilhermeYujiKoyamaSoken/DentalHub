import { SideBarDashboard } from "./_components/sideBar"


export default function DashboardLayout({
    children,

}: {
    children: React.ReactNode
}){
    return(
        <>
            <SideBarDashboard>
                {children}
            </SideBarDashboard>
            
        </>
    )
}