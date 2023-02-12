<script setup>
import { useRouter } from 'vue-router';
import { useMeta } from 'vue-meta';

useMeta({ title: 'pageTitles.home' });

const router = useRouter();

router.push('/');
</script>