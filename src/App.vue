<template>
  <main
    font-sans h-full p-0
    flex="~ col" items-center
  >
    <Navbar />

    <TheCounter :initial="0" my-6 />

    <TheFooter />

    <ModalsLayer />

    <Confetti />
  </main>
</template>
