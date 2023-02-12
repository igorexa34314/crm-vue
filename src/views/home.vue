<script setup>
import { useRouter } from 'vue-router';

useMeta({ title: 'pageTitles.home' });

const router = useRouter();

router.push('/');
</script>