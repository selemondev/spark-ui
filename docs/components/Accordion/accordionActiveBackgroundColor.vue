<template>
  <div>
    <WAccordion>
      <WAccordionItem
        :variants="{
          'my-variant': {
            accordionItemActiveBackgroundColor: '!bg-red-500 !border !border-red-500 !dark:bg-red-500 !text-white',
            accordionItemActiveTitleColor: '!text-white',
          },
        }" :variant="['my-variant', 'default']" title="Accordion Item 1"
      >
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, tempore.</p>
      </WAccordionItem>
      <WAccordionItem
        :variants="{
          'my-variant': {
            accordionItemActiveBackgroundColor: '!bg-green-500 !dark:bg-green-500 !text-white',
            accordionItemActiveTitleColor: '!text-white',
          },
        }" :variant="['my-variant', 'default']" title="Accordion Item 2"
      >
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, tempore.</p>
      </WAccordionItem>
      <WAccordionItem
        :variants="{
          'my-variant': {
            accordionItemActiveBackgroundColor: '!bg-blue-500 dark:bg-red-500 !text-white',
            accordionItemActiveTitleColor: '!text-white',
          },
        }" :variant="['my-variant', 'default']" title="Accordion Item 3"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, tempore.
      </WAccordionItem>
    </WAccordion>
  </div>
</template>
