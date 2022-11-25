<script lang="ts" setup>
  import { watch, ref, nextTick, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  const MAX_FONT_SIZE = 1000; // tried and tested:)

  const route = useRoute();
  const router = useRouter();

  type ElementRef = null | HTMLElement;

  const text = ref('Enter your text into the box above');
  const wrapper = ref<ElementRef>(null);
  const box = ref<ElementRef>(null);
  const fontSize = ref(1);

  const recalcualte = async () => {
    fontSize.value = Math.round((fontSize.value - 1) * 100) / 100;
    await nextTick();
    if (!(box.value && wrapper.value)) return;

    const hasText = text.value.length > 0;
    const isValidFontSize =
      fontSize.value > 1 && fontSize.value < MAX_FONT_SIZE;

    if (hasText) {
      if (isValidFontSize) {
        if (box.value.clientWidth > wrapper.value.clientWidth)
          await recalcualte();
        else if (box.value.clientHeight > wrapper.value.clientHeight)
          await recalcualte();
      }
    }
  };

  watch(
    text,
    () => {
      fontSize.value = MAX_FONT_SIZE;
      recalcualte();
      router.push({ name: 'home', query: { message: text.value } });
    },
    { immediate: true },
  );

  onMounted(() => {
    const message = route.query.message;
    if (message) text.value = String(message);
  });
</script>

<template>
  <div class="h-screen flex flex-col">
    <header class="p-16">
      <input
        type="text"
        v-model="text"
        placeholder="Enter text here"
        class="w-full border px-8 h-32 placeholder:text-gray" />
    </header>
    <main
      class="flex-grow flex items-center justify-center m-screen-5"
      style="max-height: calc(100vh - (10vh * 2 + 32px))"
      ref="wrapper">
      <div
        class="leading-[1] text-center font-mono -z-10"
        ref="box"
        :style="`font-size: ${fontSize}px;`">
        {{ text }}
      </div>
    </main>
  </div>
</template>
