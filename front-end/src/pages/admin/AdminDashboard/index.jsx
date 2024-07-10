import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { PieChart } from '@mui/x-charts/PieChart';
import { useGetTicketsQuery } from '../../../redux/TicketsSlice';

const AdminDashboard = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { data: tickets, isLoading, isError } = useGetTicketsQuery();
  const [myTickets, setMyTickets] = useState([]);

  useEffect(() => {
    if (tickets) {
      setMyTickets(tickets.data); // Assuming tickets.data holds the array of tickets
    }
  }, [tickets]);

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/admin/login");
    }
  }, [navigate, user]);

  const calculateTicketCounts = () => {
    if (myTickets && myTickets.length > 0) {
      const ticketCounts = {};
      myTickets.forEach(ticket => {
        const movie = ticket.movie;
        if (ticketCounts[movie]) {
          ticketCounts[movie] += ticket.seats.length;
        } else {
          ticketCounts[movie] = ticket.seats.length;
        }
      });

      const seriesData = Object.keys(ticketCounts).map((movie, index) => ({
        id: index,
        value: ticketCounts[movie],
        label: movie,
      }));

      return seriesData;
    } else {
      return [];
    }
  };

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '80px'}}>
      {myTickets.length > 0 ? (
        <PieChart 
          series={[{ data: calculateTicketCounts() }]}
          width={700}
          height={300}
        />
      ) : (
        <>
          <div>No data to display</div>
          <div style={{ marginTop: '20px' }} ></div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
