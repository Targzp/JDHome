import { useRouter } from 'vue-router'
// 点击回退逻辑
export const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return {
    handleBackClick
  }
}
