<template>
  <div>
    <WAccordion>
      <WAccordionItem
        :variants="{
          'my-variant': {
            accordionItembody: '!duration-1000',
          },
        }" :variant="['my-variant']" title="Accordion Item 1"
      >
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, tempore.</p>
      </WAccordionItem>
      <WAccordionItem
        :variants="{
          'my-variant': {
            accordionItembody: '!duration-1000',
          },
        }" :variant="['my-variant']" title="Accordion Item 2"
      >
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, tempore.</p>
      </WAccordionItem>
      <WAccordionItem
        :variants="{
          'my-variant': {
            accordionItembody: '!duration-1000',
          },
        }" :variant="['my-variant']" title="Accordion Item 3"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, tempore.
      </WAccordionItem>
    </WAccordion>
  </div>
</template>
