

select Codigo_Pedido, cliente, produto, Data_Pedido
from vw_relatoriocompra
group by Codigo_pedido
;
    select *
    from cliente
UNION all
    select *
    from produto;

select Codigo_Pedido, cliente, produto, Data_Pedido, sum(Valor_Total) as 'Faturamento', Observação
from vw_relatoriocompra
where Codigo_Pedido = 9;

select Codigo_Pedido, cliente, produto, Data_Pedido, Observação
from vw_relatoriocompra
where Codigo_Pedido = 9;

select Codigo_Pedido, cliente, group_concat(produto) as 'produtos',
    group_concat(`Valor_Unitário
`) as 'Valor Unitário' ,
     group_concat
(Quantidade) as 'Quantidade respectiva',
     sum
(Valor_Total) as 'Faturamento',  
     Data_Pedido, 
     Observação 
	from vw_relatoriocompra group by Codigo_Pedido;

select *
from vw_relatorioCompra
where Codigo_Pedido = 9;
