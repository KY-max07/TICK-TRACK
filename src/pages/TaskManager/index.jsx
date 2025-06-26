import React, { useState, useEffect } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";
import { supabase } from "../../supabase-client";
import { useUser, SignOutButton } from "@clerk/clerk-react";
import tt from '../../assets/tt.svg';

export default function Taskmanager() {
  return (
    <div className=" min-h-screen w-full bg-[#000000] bg-[radial-gradient(#ffffff18_1px,#000002_1px)] bg-[size:12px_12px] text-neutral-50 relative">
      <nav className="p-4 px-10 flex items-center justify-between">
        <img
          src={tt}
          alt="Tick-Track"
          className="md:h-7 h-4 cursor-pointer"
        />

        <div>
          <SignOutButton mode="modal">
            <button className="doto text-sm md:text-2xl hover:text-orange-500 relative z-100 cursor-pointer">
              SignOut
            </button>
          </SignOutButton>
        </div>
      </nav>

      <Board />
      <div className="fixed bottom-0 w-full bg-neutral-900/10 h-8 backdrop-blur-2xl ">
        <h1 className="w-full h-full flex items-center justify-center text-xs text-neutral-300 doto">
          {" "}
          &copy;2025 Koushik | Roundbex. All rights reserved
        </h1>
      </div>
    </div>
  );
}

const Board = () => {
  const [cards, setCards] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchCards();
    }
  }, [user]);

  async function fetchCards() {
    try {
      const { data, error } = await supabase
        .from("task")
        .select("*")
        .eq("email", user.primaryEmailAddress.emailAddress);
      if (error) throw error;
      setCards(data);
    } catch (error) {
      console.error("Error fetching cards: ", error.message);
    }
  }

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 h-full w-full gap-3  p-12 place-items-center-safe md:place-items-start relative bottom-8 lg:left-6">
      <Column
        title="Backlog"
        column="backlog"
        headingColor="text-neutral-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="TODO"
        column="todo"
        headingColor="text-yellow-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="In progress"
        column="in-progress"
        headingColor="text-blue-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Complete"
        column="complete"
        headingColor="text-emerald-200"
        cards={cards}
        setCards={setCards}
      />
      <BurnBarrel setCards={setCards} />
    </div>
  );
};

const Column = ({ title, headingColor, cards, column, setCards }) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = async (e) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id.toString() === cardId);
      if (!cardToTransfer) return;

      if (cardToTransfer.column !== column) {
        try {
          const { error } = await supabase
            .from("task")
            .update({ column })
            .eq("id", cardId);

          if (error) throw error;
        } catch (error) {
          console.error("Error updating card:", error.message);
        }
      }

      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id.toString() !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex(
          (el) => el.id.toString() === before
        );
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="md:w-56 shrink-0 w-12/12">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor} doto uppercase`}>
          {title}
        </h3>
        <span className="rounded text-sm text-neutral-400 doto">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => {
          return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};

const Card = ({ title, id, column, handleDragStart }) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing "
      >
        <p className="  line-clamp-9 font-card font-extralight text-md text-neutral-300 text-sm">
          {title}
        </p>
      </motion.div>
    </>
  );
};

const DropIndicator = ({ beforeId, column }) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};

const BurnBarrel = ({ setCards }) => {
  const [active, setActive] = useState(false);
  const { user } = useUser();

  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = async (e) => {
    const cardId = e.dataTransfer.getData("cardId");

    try {
      const { error } = await supabase
        .from("task")
        .delete()
        .eq("id", cardId)
        .eq("email", user.primaryEmailAddress.emailAddress);

      if (error) throw error;

      setCards((pv) => pv.filter((c) => c.id.toString() !== cardId));
    } catch (error) {
      console.error("Error deleting card:", error.message);
    }

    setActive(false);
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500 backdrop-blur-2xl"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500 backdrop-blur-2xl"
      }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};

const AddCard = ({ column, setCards }) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);
  const { user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim().length || !user) return;

    try {
      const { data: newCard, error } = await supabase
        .from("task")
        .insert({
          title: text.trim(),
          column,
          email: user.primaryEmailAddress.emailAddress,
        })
        .select()
        .single();

      if (error) throw error;

      setCards((pv) => [...pv, newCard]);
    } catch (error) {
      console.error("Error adding card:", error.message);
    }

    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="cursor-pointer px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="cursor-pointer flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="cursor-pointer flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add card</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};
