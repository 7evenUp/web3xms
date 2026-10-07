import { motion } from "framer-motion"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/Accordion"

const MotionItem = motion(AccordionItem)

const FaqAccordion = () => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full flex flex-col items-center"
    >
      <MotionItem
        value="item-1"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "tween", duration: 0.4 }}
      >
        <AccordionTrigger>
          Когда начинается и заканчивается ивент?
        </AccordionTrigger>
        <AccordionContent>
          С 15 по 24 декабря 2023 года будут открыты основные квесты на
          платформе Zealy. 24 декабря на мероприятии 0xConnect состоится
          Розыгрыш автомобиля Ford Mustang.
        </AccordionContent>
      </MotionItem>
      <MotionItem
        value="item-2"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "tween", duration: 0.4, delay: 0.1 }}
      >
        <AccordionTrigger>Как будет проходить ивент?</AccordionTrigger>
        <AccordionContent>
          Мероприятие будет проходить в несколько этапов: 15-24 декабря,
          выполняя квесты на платформе Zealy, каждый участник будет зарабатывать
          XP. 22-24 декабря на нашем сайте по навигации: «МЕНЮ - КВЕСТ - 2
          этап», каждый участник получит право на открытие «Волшебного Бокса» с
          рандомным подарком. 24 декабря состоится Розыгрыш Ford Mustang на
          криптомитапе 0xConnect в Москве между всеми участниками, которым из
          «Волшебного Бокса» выпадет NFT-ваучер на тачку (всего таких ваучеров
          будет 5,000 шт.) с 25 декабря служба доставки Crypton начнёт
          отправлять подарки согласно заявкам: по РФ услугами компании СДЭК; по
          странам СНГ, в Украину и по Миру - работа будет проводиться в
          индивидуальном формате.
        </AccordionContent>
      </MotionItem>
      <MotionItem
        value="item-3"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "tween", duration: 0.4, delay: 0.2 }}
      >
        <AccordionTrigger>Когда и как можно забрать подарки?</AccordionTrigger>
        <AccordionContent>
          Подарки можно будет забрать в любой момент, начиная с 25 декабря. Для
          этого потребуется обратиться в Службы Поддержки ивента: @
          <a
            href="https://t.me/HelpXMAS2"
            target="_blank"
            className="underline underline-offset-4 relative"
          >
            HelpXMAS
          </a>
          . Все заявки будут обрабатываться вручную, операторы в конечном итоге
          проинформируют о деталях и условиях доставки.
        </AccordionContent>
      </MotionItem>
      <MotionItem
        value="item-4"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "tween", duration: 0.4, delay: 0.3 }}
      >
        <AccordionTrigger>
          Что делать, если возникли трудности с заданиями или другие проблемы?
        </AccordionTrigger>
        <AccordionContent>
          При возникновении трудностей с заданиями или сложностей иного формата
          создан специальный Телеграм-аккаунт Службы Поддержки: @
          <a
            href="https://t.me/HelpXMAS2"
            target="_blank"
            className="underline underline-offset-4 relative"
          >
            HelpXMAS
          </a>
          . Группа специалистов ивента будет рада помочь по любым вопросам.
        </AccordionContent>
      </MotionItem>
      <MotionItem
        value="item-5"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "tween", duration: 0.4, delay: 0.4 }}
      >
        <AccordionTrigger>
          Что из себя представляют кейсы? (описание кейсов и подарков в них)
        </AccordionTrigger>
        <AccordionContent>
          Кейс, он же «Волшебный Бокс», он же «Кладезь Волшебный», представляет
          собой закрытый ящик, внутри которого алгоритмически заложен рандомный
          подарок. При его открытии каждый участник с определённой долей
          вероятности получает тот или иной презент из общего списка подарков
          (см. список призов и их количество на Главной странице нашего сайта)
        </AccordionContent>
      </MotionItem>
      <MotionItem
        value="item-6"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "tween", duration: 0.4, delay: 0.5 }}
      >
        <AccordionTrigger>
          Когда будет проходить розыгрыш мустанга? Как принять участие?
        </AccordionTrigger>
        <AccordionContent>
          Розыгрыш Ford Mustang пройдёт 24 декабря на криптомитапе 0xConnect в
          Москве. Павел Сычев (фаундер Crypton), он же «EnjoyMaloy», он же
          Паштет, вместе с криптодедушкой Никитой Грязиным (фаундер MoniTalks)
          вместе определят победителя, вытащив рандомный номер счастливого
          NFT-ваучера из барабана. Принять участие в Розыгрыше сможет любой
          участник, которому из «Волшебного Бокса» выпадет 1 из 5,000
          NFT-ваучеров на тачку.
        </AccordionContent>
      </MotionItem>
      <MotionItem
        value="item-7"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "tween", duration: 0.4, delay: 0.5 }}
      >
        <AccordionTrigger>
          Что из себя представляют очки и как их превращать в подарки?
        </AccordionTrigger>
        <AccordionContent>
          Очки, они же ХР, представляют собой баллы за выполненные задания на
          платформе Zealy. Эти баллы посредством «кодерской магии» подтягиваются
          прямо в личный кабинет на наш сайт. 22 декабря, когда откроется раздел
          с кейсами (навигация: МЕНЮ - КВЕСТ - 2 этап), на эти баллы каждый
          участник сможет открыть определённое количество «Волшебных Боксов». Из
          них выпадет рандомный новогодний подарок.
        </AccordionContent>
      </MotionItem>
    </Accordion>
  )
}

export default FaqAccordion
