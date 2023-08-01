import AuthGuard from '@/AuthGuards/AuthGuards'
import AdminAddSocialColorPage from '@/components/Admin/AdminAddSocialColorPage/AdminAddSocialColorPage'
import AdminDashboardLayout from '@/layouts/DashboardLayouts/AdminDashboardLayouts'
import React from 'react'

export default function AddSocialColors() {
  return (
    <AuthGuard>
      <AdminDashboardLayout>
        <AdminAddSocialColorPage/>
      </AdminDashboardLayout>
    </AuthGuard>
  )
}